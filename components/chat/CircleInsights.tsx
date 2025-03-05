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
} from "lucide-react";
import { ValidationState } from "@/lib/langgraph/types";

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

interface ScoreDetails {
  baseScores?: BaseScores;
  intentCriteria?: Record<string, number | boolean>;
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
}

const CircleInsights = ({
  validation,
  messageCount,
  currentIntent,
  insights = [],
  nextSteps = [],
  scoreDetails,
  recruitmentMatch,
}: InsightsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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

  const getDetailedScores = () => {
    if (!scoreDetails?.baseScores) return null;

    return (
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-foreground">Score Details</h3>
        <div className="space-y-1">
          {Object.entries(scoreDetails.baseScores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-xs font-medium">
                {Math.round((value ?? 0) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
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

      {isExpanded && (
        <Card className="absolute bottom-14 lg:right-0 w-80 shadow-lg z-50 border-border">
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

            {getDetailedScores()}

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-foreground">Conversation</h3>
              <div className="text-xs text-muted-foreground">
                <span>Messages: {messageCount}</span>
              </div>
            </div>

            {insights.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground">Key Points</h3>
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

            {nextSteps.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground">Next Steps</h3>
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
                {recruitmentMatch.missingInfo.length > 0 && (
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircleInsights;