"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  Brain,
  MessageSquare,
  Target,
  ArrowUpRight,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Calendar,
  BarChart,
  Clock,
  Info,
} from "lucide-react";
import { ScoreDetails, ValidationState } from "@/lib/langgraph/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ValidationInfo {
  state: ValidationState;
  score: number;
  pinAttempts: number;
  resendAttempts: number;
}

interface BaseScores {
  problemUnderstanding?: number;
  solutionVision?: number;
  projectCommitment?: number;
  engagementQuality?: number;
}



type Intent = "IDEA_VALIDATION" | "PROJECT_ASSISTANCE" | "TECHNICAL_CONSULTATION" | "INFORMATION" | "RECRUITMENT";

interface InsightsProps {
  validation: ValidationInfo;
  messageCount: number;
  currentIntent?: Intent;
  conversationContext?: string;
  insights?: string[];
  nextSteps?: string[];
  scoreDetails?: ScoreDetails;
  recruitmentMatch?: {
    matches: boolean;
    reason: string;
    missingInfo: string[];
  };
  // Extended props for enhanced insights
  projectTimeline?: {
    estimated: string;
    complexity: "Low" | "Medium" | "High";
  };
  technicalRequirements?: {
    name: string;
    confidence: number;
  }[];
  sentimentAnalysis?: {
    overall: "Positive" | "Neutral" | "Negative";
    details: {
      excitement: number;
      interest: number;
      concern: number;
    };
  };
  keyEntities?: {
    name: string;
    type: string;
    significance: number;
  }[];
  meetingPriority?: "Low" | "Medium" | "High";
}

const CircleInsights = ({
  validation,
  messageCount,
  currentIntent,
  insights = [],
  nextSteps = [],
  scoreDetails,
  recruitmentMatch,
  projectTimeline,
  technicalRequirements,
  sentimentAnalysis,
  keyEntities,
  meetingPriority = "Medium",
}: InsightsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Log received props for debugging
  useEffect(() => {
    console.log("CircleInsights received props:", {
      validation,
      currentIntent,
      scoreDetails,
      technicalRequirements,
      sentimentAnalysis,
      keyEntities,
      meetingPriority
    });
  }, [validation, currentIntent, scoreDetails, technicalRequirements, sentimentAnalysis, keyEntities, meetingPriority]);
  
  // Convert score to percentage (0-100)
  const normalizedScore = Math.min(Math.max(validation.score, 0), 1) * 100;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedScore / 100) * circumference;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 70) return "text-green-500 dark:text-green-400";
    if (score >= 40) return "text-primary";
    return "text-primary";
  };

  const getProgressColor = (score: number): string => {
    if (score >= 70) return "stroke-green-500 dark:stroke-green-400";
    if (score >= 40) return "stroke-primary";
    return "stroke-primary";
  };

  const getIntentIcon = (intent?: Intent) => {
    const iconProps = { className: "w-4 h-4" };
    switch (intent) {
      case "IDEA_VALIDATION":
        return <Brain {...iconProps} />;
      case "PROJECT_ASSISTANCE":
        return <Activity {...iconProps} />;
      case "RECRUITMENT":
        return <Target {...iconProps} />;
      case "TECHNICAL_CONSULTATION":
        return <Lightbulb {...iconProps} />;
      default:
        return <MessageSquare {...iconProps} />;
    }
  };

  const getValidationStateLabel = (state: ValidationState) => {
    switch (state) {
      case "VALIDATED":
        return "Validated";
      case "PIN_SENT":
        return "Verifying";
      case "READY":
        return "Ready";
      case "ANALYZING":
        return "Analyzing";
      case "NONE":
        return "Not Started";
      default:
        return "In Progress";
    }
  };

  const getMeetingPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-rose-500 dark:text-rose-400";
      case "Medium":
        return "text-amber-500 dark:text-amber-400";
      case "Low":
        return "text-emerald-500 dark:text-emerald-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (sentiment) {
      case "Positive":
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case "Negative":
        return <AlertCircle {...iconProps} className="text-red-500" />;
      case "Neutral":
      default:
        return <HelpCircle {...iconProps} className="text-blue-500" />;
    }
  };

  const getDetailedScores = () => {
    // Early return with debugging message if no score details are available
    if (!scoreDetails?.baseScores || Object.keys(scoreDetails.baseScores).length === 0) {
      console.log("No baseScores available in scoreDetails:", scoreDetails);
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-foreground">Score Details</h3>
          <p className="text-xs text-muted-foreground">No detailed scores available yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-foreground">Score Details</h3>
        <div className="space-y-1">
          {Object.entries(scoreDetails.baseScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${(value ?? 0) >= 0.7 ? "bg-green-500" : "bg-primary"}`}
                    style={{ width: `${(value ?? 0) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {Math.round((value ?? 0) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Intent-specific criteria visualization
  const getIntentCriteria = () => {
    // Early return with debugging message if no criteria are available
    if (!scoreDetails?.intentCriteria || Object.keys(scoreDetails.intentCriteria).length === 0) {
      console.log("No intentCriteria available in scoreDetails:", scoreDetails);
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-foreground">Intent Analysis</h3>
          <p className="text-xs text-muted-foreground">No intent criteria available yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-foreground">Intent Analysis</h3>
        <div className="space-y-1">
          {Object.entries(scoreDetails.intentCriteria)
            .filter(([_, value]) => typeof value === "number")
            .map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${(value as number) >= 0.7 ? "bg-green-500" : "bg-primary"}`}
                      style={{ width: `${(value as number) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">
                    {Math.round((value as number) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          
          {/* For boolean criteria (e.g., recruitment) */}
          {Object.entries(scoreDetails.intentCriteria)
            .filter(([_, value]) => typeof value === "boolean")
            .map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim().replace(/^is/, '')}
                </span>
                <span className={`text-xs font-medium ${value ? "text-green-500" : "text-red-500"}`}>
                  {value ? "Yes" : "No"}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const getTechnicalRequirementsSection = () => {
    // Early return with debugging message if no technical requirements are available
    if (!technicalRequirements || technicalRequirements.length === 0) {
      console.log("No technicalRequirements available:", technicalRequirements);
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-foreground">Technical Requirements</h3>
          <p className="text-xs text-muted-foreground">No technical requirements identified yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-foreground">Technical Requirements</h3>
        <div className="space-y-1">
          {technicalRequirements.map((req, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{req.name}</span>
              <Badge variant={req.confidence >= 0.7 ? "default" : "outline"} className="text-xs">
                {Math.round(req.confidence * 100)}%
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getSentimentAnalysisSection = () => {
    // Early return with debugging message if no sentiment analysis is available
    if (!sentimentAnalysis) {
      console.log("No sentimentAnalysis available:", sentimentAnalysis);
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-foreground">Sentiment Analysis</h3>
          <p className="text-xs text-muted-foreground">No sentiment analysis available yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-medium text-foreground">Sentiment Analysis</h3>
          <div className="flex items-center gap-1">
            {getSentimentIcon(sentimentAnalysis.overall)}
            <span className="text-xs font-medium">{sentimentAnalysis.overall}</span>
          </div>
        </div>
        
        {sentimentAnalysis.details && (
          <div className="space-y-1">
            {Object.entries(sentimentAnalysis.details).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground capitalize">{key}</span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{Math.round(value * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getKeyEntitiesSection = () => {
    // Early return with debugging message if no key entities are available
    if (!keyEntities || keyEntities.length === 0) {
      console.log("No keyEntities available:", keyEntities);
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-foreground">Key Entities</h3>
          <p className="text-xs text-muted-foreground">No key entities identified yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-foreground">Key Entities</h3>
        <div className="flex flex-wrap gap-1">
          {keyEntities.map((entity, i) => (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${entity.significance > 0.7 ? "border-primary" : ""}`}
                  >
                    {entity.name}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{entity.type} (Relevance: {Math.round(entity.significance * 100)}%)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center bg-secondary/20 hover:bg-secondary/30 rounded-lg p-2 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Show conversation insights"
            >
              <div className="relative w-8 h-8">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    strokeWidth="2.5"
                    fill="transparent"
                    className="stroke-muted"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    strokeWidth="2.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    className={`${getProgressColor(normalizedScore)} transition-all duration-300`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-medium ${getScoreColor(normalizedScore)}`}>
                    {Math.round(normalizedScore)}
                  </span>
                </div>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Conversation Insights ({Math.round(normalizedScore)}% Match)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isExpanded && (
        <Card className="absolute bottom-14 right-0 w-80 max-h-[80vh] overflow-y-auto shadow-lg z-50 border-border">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIntentIcon(currentIntent)}
                  <span className="text-sm font-medium capitalize">
                    {currentIntent?.toLowerCase().replace(/_/g, " ") || "General"}
                  </span>
                </div>
                <div className={`text-xs ${getScoreColor(normalizedScore)} flex items-center gap-1`}>
                  <span>{getValidationStateLabel(validation.state)}</span>
                  {validation.state === "VALIDATED" && <ArrowUpRight className="w-3 h-3" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className={`text-xs font-medium ${getScoreColor(normalizedScore)}`}>
                    {Math.round(normalizedScore)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 bg-primary ${normalizedScore >= 70 && "bg-green-500"}`}
                    style={{ width: `${normalizedScore}%` }}
                    role="progressbar"
                    aria-valuenow={normalizedScore}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full h-8">
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
                <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-medium text-foreground">Conversation</h3>
                    <span className="text-xs text-muted-foreground">{messageCount} messages</span>
                  </div>
                  
                  {/* Meeting priority status */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Meeting Priority
                    </span>
                    <span className={`text-xs font-medium ${getMeetingPriorityColor(meetingPriority)}`}>
                      {meetingPriority}
                    </span>
                  </div>
                  
                  {/* Project timeline if available */}
                  {projectTimeline && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Timeline
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {projectTimeline.estimated} ({projectTimeline.complexity})
                      </Badge>
                    </div>
                  )}
                </div>
                
                {insights && insights.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-foreground">Key Points</h3>
                    <ul className="space-y-1">
                      {insights.slice(0, 3).map((insight, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span aria-hidden="true">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                      {insights.length > 3 && (
                        <li className="text-xs text-primary cursor-pointer" 
                            onClick={() => setActiveTab("insights")}>
                          + {insights.length - 3} more insights
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                {nextSteps && nextSteps.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-foreground">Next Steps</h3>
                    <ul className="space-y-1">
                      {nextSteps.slice(0, 2).map((step, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span aria-hidden="true">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                      {nextSteps.length > 2 && (
                        <li className="text-xs text-primary cursor-pointer"
                            onClick={() => setActiveTab("insights")}>
                          + {nextSteps.length - 2} more steps
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-4 space-y-3">
                {getDetailedScores()}
                {getIntentCriteria()}
                {getTechnicalRequirementsSection()}
                {getSentimentAnalysisSection()}
              </TabsContent>
              
              <TabsContent value="insights" className="mt-4 space-y-3">
                {getKeyEntitiesSection()}
                
                {insights && insights.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-foreground">All Key Points</h3>
                    <ul className="space-y-1">
                      {insights.map((insight, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span aria-hidden="true">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {nextSteps && nextSteps.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-foreground">All Next Steps</h3>
                    <ul className="space-y-1">
                      {nextSteps.map((step, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span aria-hidden="true">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentIntent === "RECRUITMENT" && recruitmentMatch && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-foreground">Recruitment Match</h3>
                    <p className={`text-xs ${
                      recruitmentMatch.matches 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {recruitmentMatch.reason}
                    </p>
                    {recruitmentMatch.missingInfo && recruitmentMatch.missingInfo.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <span className="font-medium">Missing information:</span>
                        <ul className="mt-1 space-y-1">
                          {recruitmentMatch.missingInfo.map((info, i) => (
                            <li key={i} className="flex gap-2">
                              <span aria-hidden="true">•</span>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircleInsights;