
/**
 * NEXORA AI — Proprietary Career Logic Engine
 * Version: 1.0
 * Independent module — does not modify existing AI chat.
 */

const NEXORA_AI_ENGINE = {
  version: "1.0",

  analyzeCareer(input = {}) {
    const goal = String(input.goal || "").trim();
    const skills = Array.isArray(input.skills) ? input.skills : [];
    const education = String(input.education || "").trim();
    const experience = String(input.experience || "").trim();
    const interests = Array.isArray(input.interests)
      ? input.interests
      : [];

    if (!goal) {
      return {
        success: false,
        message: "Please enter your career goal."
      };
    }

    const skillList = skills.map(skill =>
      String(skill).trim()
    ).filter(Boolean);

    const interestList = interests.map(item =>
      String(item).trim()
    ).filter(Boolean);

    const skillGaps = this.getSkillGaps(goal, skillList);

    const roadmap = this.createRoadmap(goal, skillGaps);

    return {
      success: true,
      engine: "NEXORA Proprietary Career Logic",
      version: this.version,
      profile: {
        goal,
        education,
        experience,
        skills: skillList,
        interests: interestList
      },
      analysis: {
        currentSkills: skillList,
        missingSkills: skillGaps,
        skillCount: skillList.length,
        readinessLevel: this.getReadiness(skillList.length)
      },
      roadmap,
      recommendations: this.getRecommendations(goal, skillGaps)
    };
  },

  getSkillGaps(goal, skills) {
    const normalizedGoal = goal.toLowerCase();

    const careerSkills = {
      "web developer": [
        "HTML", "CSS", "JavaScript",
        "GitHub", "Responsive Design", "APIs"
      ],
      "ai developer": [
        "Python", "JavaScript", "AI Fundamentals",
        "Prompt Engineering", "APIs", "Problem Solving"
      ],
      "graphic designer": [
        "Design Principles", "Typography",
        "Color Theory", "Figma", "Branding"
      ],
      "video editor": [
        "Video Editing", "Storytelling",
        "Audio Editing", "Color Grading"
      ],
      "data analyst": [
        "Excel", "SQL", "Python",
        "Data Visualization", "Statistics"
      ],
      "digital marketer": [
        "SEO", "Content Marketing",
        "Social Media", "Analytics", "Copywriting"
      ]
    };

    let selected = Object.keys(careerSkills).find(key =>
      normalizedGoal.includes(key)
    );

    const required = selected
      ? careerSkills[selected]
      : [
          "Communication",
          "Problem Solving",
          "Digital Skills",
          "Professional Portfolio",
          "Industry Knowledge"
        ];

    return required.filter(requiredSkill =>
      !skills.some(userSkill =>
        userSkill.toLowerCase().includes(
          requiredSkill.toLowerCase()
        )
      )
    );
  },

  getReadiness(skillCount) {
    if (skillCount >= 5) return "Developing";
    if (skillCount >= 2) return "Early Stage";
    return "Beginner";
  },

  createRoadmap(goal, missingSkills) {
    const firstSkills = missingSkills.slice(0, 3);
    const nextSkills = missingSkills.slice(3);

    return [
      {
        stage: 1,
        title: "Foundation",
        duration: "Weeks 1–2",
        tasks: [
          "Understand your career goal",
          "Study the fundamentals",
          ...firstSkills.map(skill =>
            "Start learning " + skill
          )
        ]
      },
      {
        stage: 2,
        title: "Skill Development",
        duration: "Weeks 3–6",
        tasks: [
          ...nextSkills.map(skill =>
            "Practice " + skill
          ),
          "Complete practical exercises",
          "Build a small project"
        ]
      },
      {
        stage: 3,
        title: "Portfolio Building",
        duration: "Weeks 7–8",
        tasks: [
          "Create projects related to " + goal,
          "Document your work",
          "Prepare a professional portfolio"
        ]
      },
      {
        stage: 4,
        title: "Career Preparation",
        duration: "Weeks 9–10",
        tasks: [
          "Prepare your resume",
          "Practice interviews",
          "Review your skill gaps",
          "Plan your next learning goals"
        ]
      }
    ];
  },

  getRecommendations(goal, missingSkills) {
    return [
      "Focus on practical projects for " + goal + ".",
      "Practice consistently and track your progress.",
      missingSkills.length
        ? "Prioritize learning: " + missingSkills.slice(0, 3).join(", ") + "."
        : "Continue improving your existing skills.",
      "Build a portfolio to demonstrate your abilities."
    ];
  }
};

// Browser and module compatibility.
if (typeof window !== "undefined") {
  window.NEXORA_AI_ENGINE = NEXORA_AI_ENGINE;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = NEXORA_AI_ENGINE;
}
