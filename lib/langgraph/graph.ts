// src/lib/langgraph/graph.ts

import { ChatState, Graph, Node, Edge } from "./types";
import { createContextAnalyzer, createValidationManager, createMeetingManager } from "./nodes";
import { ChatError, ErrorCode } from "@/lib/langgraph/types";

/**
 * Chat processing graph for managing conversation flow
 */
export class ChatGraph {
  private graph: Graph<ChatState>;

  constructor() {
    // Create nodes for the graph
    const nodes = new Map<string, Node<ChatState>>();
    nodes.set("contextAnalyzer", createContextAnalyzer());
    nodes.set("validationManager", createValidationManager());
    nodes.set("meetingManager", createMeetingManager());
    nodes.set("end", async (state) => state);

    // Define edges between nodes
    const edges = new Map<string, Map<string, Edge<ChatState>>>();
    
    // From contextAnalyzer to validationManager
    edges.set("contextAnalyzer", new Map([
      ["validationManager", () => true]
    ]));
    
    // From validationManager to meetingManager
    edges.set("validationManager", new Map([
      ["meetingManager", () => true]
    ]));
    
    // From meetingManager to end
    edges.set("meetingManager", new Map([
      ["end", () => true]
    ]));

    // Set up the graph
    this.graph = {
      nodes,
      edges,
      start: "contextAnalyzer",
      end: "end"
    };
  }

  /**
   * Process a chat state through the graph
   */
  async process(state: ChatState): Promise<ChatState> {
    try {
      let currentNode = this.graph.start;
      let currentState = state;

      // Process through the graph until we reach the end
      while (currentNode !== this.graph.end) {
        // Get node function
        const nodeFn = this.graph.nodes.get(currentNode);
        if (!nodeFn) {
          throw new ChatError(
            `Node not found: ${currentNode}`, 
            ErrorCode.PROCESS_MESSAGE_ERROR
          );
        }

        // Process state through the node
        currentState = await nodeFn(currentState);

        // Get next node
        const nextNodeEdges = this.graph.edges.get(currentNode);
        if (!nextNodeEdges) {
          throw new ChatError(
            `No edges defined for node: ${currentNode}`, 
            ErrorCode.PROCESS_MESSAGE_ERROR
          );
        }

        // Find the first edge whose condition is true
        let nextNode: string | null = null;
        for (const [node, condition] of nextNodeEdges.entries()) {
          if (condition(currentState)) {
            nextNode = node;
            break;
          }
        }

        if (!nextNode) {
          throw new ChatError(
            `No valid edge from node: ${currentNode}`, 
            ErrorCode.PROCESS_MESSAGE_ERROR
          );
        }

        // Move to next node
        currentNode = nextNode;
      }

      // Final step - process through end node
      const endNodeFn = this.graph.nodes.get(this.graph.end);
      if (!endNodeFn) {
        throw new ChatError(
          `End node not found`, 
          ErrorCode.PROCESS_MESSAGE_ERROR
        );
      }
      
      return await endNodeFn(currentState);
    } catch (error) {
      console.error("Error processing chat graph:", error);
      throw new ChatError(
        `Failed to process chat: ${error instanceof Error ? error.message : String(error)}`,
        ErrorCode.PROCESS_MESSAGE_ERROR,
        500
      );
    }
  }
}