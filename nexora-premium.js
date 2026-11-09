
/**
 * NEXORA AI — Premium Access & Question Limit
 * Version: 2.0
 *
 * First 10 questions FREE.
 * After 10 questions, Premium ₹99 is required.
 * Premium users get unlimited questions.
 *
 * IMPORTANT:
 * Question counts and payment verification
 * must be enforced by a secure backend.
 */

const NEXORA_PREMIUM = {
  version: "2.0",

  FREE_QUESTION_LIMIT: 10,

  plans: {
    free: {
      id: "free",
      name: "Free Plan",
      price: 0,
      currency: "INR",
      questionLimit: 10,
      features: [
        "First 10 AI Questions Free",
        "Basic Career Planning",
        "Basic Skills Assessment",
        "Career Resources"
      ]
    },

    premium: {
      id: "premium",
      name: "NEXORA Premium",
      price: 99,
      currency: "INR",
      billing: "one-time",
      questionLimit: "unlimited",
      features: [
        "Unlimited AI Questions",
        "Advanced Career Roadmaps",
        "Detailed Skills Analysis",
        "Personalized Career Recommendations",
        "Premium Career Resources",
        "Advanced Learning Plans"
      ]
    }
  },

  getPlans() {
    return Object.values(this.plans);
  },

  getPlan(planId) {
    return this.plans[planId] || null;
  },

  checkQuestionAccess(questionCount, verifiedPayment = null) {
    const count = Math.max(0, Number(questionCount) || 0);

    const premiumActive =
      verifiedPayment &&
      verifiedPayment.verified === true &&
      verifiedPayment.status === "paid" &&
      verifiedPayment.planId === "premium";

    if (premiumActive) {
      return {
        allowed: true,
        plan: "premium",
        remainingQuestions: "unlimited",
        message: "Premium access active. Ask unlimited questions."
      };
    }

    if (count < this.FREE_QUESTION_LIMIT) {
      return {
        allowed: true,
        plan: "free",
        remainingQuestions: this.FREE_QUESTION_LIMIT - count,
        message:
          "Free question " + (count + 1) +
          " of " + this.FREE_QUESTION_LIMIT
      };
    }

    return {
      allowed: false,
      plan: "free",
      remainingQuestions: 0,
      premiumPrice: 99,
      currency: "INR",
      message:
        "Your 10 free questions are complete. " +
        "Upgrade to NEXORA Premium for ₹99 and get unlimited questions."
    };
  },

  createCheckoutRequest(userId) {
    if (!userId) {
      return {
        success: false,
        message: "Please sign in before purchasing Premium."
      };
    }

    return {
      success: true,
      checkoutRequest: {
        userId: String(userId),
        planId: "premium",
        amount: 99,
        currency: "INR",
        requestId: this.generateId(),
        createdAt: new Date().toISOString()
      },
      message: "Send this request to the secure payment backend."
    };
  },

  getAccessStatus(verifiedPayment) {
    const active =
      verifiedPayment &&
      verifiedPayment.verified === true &&
      verifiedPayment.status === "paid" &&
      verifiedPayment.planId === "premium";

    return {
      success: true,
      plan: active ? "premium" : "free",
      premiumAccess: Boolean(active),
      questionLimit: active ? "unlimited" : 10
    };
  },

  generateId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return "NEXORA-PAY-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 10);
  }
};

if (typeof window !== "undefined") {
  window.NEXORA_PREMIUM = NEXORA_PREMIUM;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NEXORA_PREMIUM;
}
