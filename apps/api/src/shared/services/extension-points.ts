// Phase 2 Extension Points - AI & Integration Services
// These interfaces define contracts for future implementations.
// MVP provides stub implementations that throw NotImplemented errors.

import {
  IAIRecommendationService,
  IAIAdvisorService,
  IAIResumeBuilderService,
  IAISOPGeneratorService,
  IAIDocumentVerificationService,
  IAIChatAssistantService,
  IPaymentGatewayService,
  IWhatsAppIntegrationService,
  IEmailAutomationService,
  IAnalyticsEngineService,
  University,
} from '@mge/types';

class NotImplementedService {
  protected throwNotImplemented(method: string): never {
    throw new Error(`${method} is a Phase 2 feature and is not yet implemented`);
  }
}

export class AIRecommendationService extends NotImplementedService implements IAIRecommendationService {
  async getUniversityRecommendations(_studentId: string): Promise<University[]> {
    this.throwNotImplemented('AI University Recommendation');
  }
}

export class AIAdvisorService extends NotImplementedService implements IAIAdvisorService {
  async getEducationAdvice(_query: string, _studentId: string): Promise<string> {
    this.throwNotImplemented('AI Education Advisor');
  }
}

export class AIResumeBuilderService extends NotImplementedService implements IAIResumeBuilderService {
  async generateResume(_studentId: string): Promise<string> {
    this.throwNotImplemented('AI Resume Builder');
  }
}

export class AISOPGeneratorService extends NotImplementedService implements IAISOPGeneratorService {
  async generateSOP(_applicationId: string): Promise<string> {
    this.throwNotImplemented('AI SOP Generator');
  }
}

export class AIDocumentVerificationService extends NotImplementedService implements IAIDocumentVerificationService {
  async verifyDocument(_documentId: string): Promise<{ verified: boolean; issues: string[] }> {
    this.throwNotImplemented('AI Document Verification');
  }
}

export class AIChatAssistantService extends NotImplementedService implements IAIChatAssistantService {
  async chat(_message: string, _sessionId: string): Promise<string> {
    this.throwNotImplemented('AI Chat Assistant');
  }
}

export class PaymentGatewayService extends NotImplementedService implements IPaymentGatewayService {
  async createPayment(_amount: number, _currency: string, _metadata: Record<string, unknown>): Promise<{ paymentId: string }> {
    this.throwNotImplemented('Payment Gateway');
  }
}

export class WhatsAppIntegrationService extends NotImplementedService implements IWhatsAppIntegrationService {
  async sendMessage(_phone: string, _message: string): Promise<void> {
    this.throwNotImplemented('WhatsApp Integration');
  }
}

export class EmailAutomationService extends NotImplementedService implements IEmailAutomationService {
  async sendTemplateEmail(_templateId: string, _to: string, _data: Record<string, unknown>): Promise<void> {
    this.throwNotImplemented('Email Automation');
  }
}

export class AnalyticsEngineService extends NotImplementedService implements IAnalyticsEngineService {
  async trackEvent(_event: string, _properties: Record<string, unknown>): Promise<void> {
    this.throwNotImplemented('Analytics Engine');
  }
}

export const extensionServices = {
  aiRecommendation: new AIRecommendationService(),
  aiAdvisor: new AIAdvisorService(),
  aiResumeBuilder: new AIResumeBuilderService(),
  aiSOPGenerator: new AISOPGeneratorService(),
  aiDocumentVerification: new AIDocumentVerificationService(),
  aiChatAssistant: new AIChatAssistantService(),
  paymentGateway: new PaymentGatewayService(),
  whatsapp: new WhatsAppIntegrationService(),
  emailAutomation: new EmailAutomationService(),
  analytics: new AnalyticsEngineService(),
};
