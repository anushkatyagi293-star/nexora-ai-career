
/**
 * NEXORA AI — B2B / SaaS Admin Dashboard
 * Version: 1.0
 * Independent module.
 *
 * IMPORTANT:
 * This is a dashboard logic foundation.
 * Production authentication and database storage
 * must be connected through a secure backend.
 */

const NEXORA_ADMIN = {
  version: "1.0",

  createInstitution(data = {}) {
    const name = String(data.name || "").trim();
    const type = String(data.type || "").trim();
    const email = String(data.email || "").trim();

    if (!name || !type || !email) {
      return {
        success: false,
        message: "Institution name, type and email are required."
      };
    }

    return {
      success: true,
      institution: {
        id: this.generateId(),
        name,
        type,
        email,
        createdAt: new Date().toISOString(),
        status: "pending"
      }
    };
  },

  createStudent(data = {}) {
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const institutionId = String(data.institutionId || "").trim();

    if (!name || !email || !institutionId) {
      return {
        success: false,
        message: "Student name, email and institution ID are required."
      };
    }

    return {
      success: true,
      student: {
        id: this.generateId(),
        name,
        email,
        institutionId,
        assessmentCompleted: false,
        careerGoal: "",
        createdAt: new Date().toISOString()
      }
    };
  },

  createAssessmentReport(student, assessment = {}) {
    if (!student || !student.id) {
      return {
        success: false,
        message: "Valid student information is required."
      };
    }

    return {
      success: true,
      report: {
        id: this.generateId(),
        studentId: student.id,
        studentName: student.name,
        careerGoal: assessment.careerGoal || "Not specified",
        skills: Array.isArray(assessment.skills)
          ? assessment.skills
          : [],
        strengths: Array.isArray(assessment.strengths)
          ? assessment.strengths
          : [],
        improvementAreas: Array.isArray(assessment.improvementAreas)
          ? assessment.improvementAreas
          : [],
        generatedAt: new Date().toISOString()
      }
    };
  },

  getInstitutionDashboard(institution, students = [], reports = []) {
    if (!institution || !institution.id) {
      return {
        success: false,
        message: "Valid institution information is required."
      };
    }

    const institutionStudents = students.filter(
      student => student.institutionId === institution.id
    );

    const studentIds = institutionStudents.map(student => student.id);

    const institutionReports = reports.filter(
      report => studentIds.includes(report.studentId)
    );

    return {
      success: true,
      institution: {
        id: institution.id,
        name: institution.name,
        type: institution.type,
        status: institution.status
      },
      statistics: {
        totalStudents: institutionStudents.length,
        completedAssessments: institutionStudents.filter(
          student => student.assessmentCompleted
        ).length,
        totalReports: institutionReports.length
      },
      students: institutionStudents,
      reports: institutionReports
    };
  },

  generateId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return "NEXORA-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 10);
  }
};

// Browser compatibility.
if (typeof window !== "undefined") {
  window.NEXORA_ADMIN = NEXORA_ADMIN;
}

// Node.js compatibility.
if (typeof module !== "undefined" && module.exports) {
  module.exports = NEXORA_ADMIN;
}
