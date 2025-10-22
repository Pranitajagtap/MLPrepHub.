import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  link: {
    color: '#2563eb',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1pt solid #e5e7eb',
    paddingBottom: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
    border: '1pt solid #e5e7eb',
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: '3pt solid #3b82f6',
  },
  position: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  company: {
    color: '#374151',
    marginBottom: 4,
  },
  description: {
    color: '#6b7280',
    marginTop: 4,
  },
  educationItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: '3pt solid #10b981',
  },
  degree: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  institution: {
    color: '#374151',
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: '3pt solid #8b5cf6',
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  technologies: {
    color: '#374151',
    marginTop: 4,
  },
  // Add certifications styles
  certificationItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: '3pt solid #f59e0b',
  },
  certificationName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  issuer: {
    color: '#374151',
    marginBottom: 2,
  },
  credentialInfo: {
    color: '#6b7280',
    fontSize: 10,
  },
});

interface ResumePDFProps {
  resumeData: ResumeData;
}

export const ResumePDF = ({ resumeData }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {resumeData.personalInfo.name || 'Your Name'}
        </Text>
        {resumeData.role && (
          <Text style={{ fontSize: 16, color: '#6b7280', marginBottom: 10 }}>
            {resumeData.role}
          </Text>
        )}
        <View style={styles.contactInfo}>
          {resumeData.personalInfo.email && (
            <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
          )}
          {resumeData.personalInfo.phone && (
            <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
          )}
          {resumeData.personalInfo.location && (
            <Text style={styles.contactItem}>{resumeData.personalInfo.location}</Text>
          )}
        </View>
        <View style={styles.links}>
          {resumeData.personalInfo.portfolio && (
            <Text style={styles.link}>Portfolio</Text>
          )}
          {resumeData.personalInfo.linkedin && (
            <Text style={styles.link}>LinkedIn</Text>
          )}
        </View>
      </View>

      {/* Summary */}
      {resumeData.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text>{resumeData.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      {resumeData.experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resumeData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.position}>{exp.position}</Text>
              <Text style={styles.company}>
                {exp.company} | {exp.period}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
              {exp.achievements && exp.achievements.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <Text key={achievementIndex} style={styles.description}>
                      • {achievement}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.institution}>
                {edu.institution} | {edu.period}
              </Text>
              {edu.gpa && (
                <Text style={styles.description}>GPA: {edu.gpa}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resumeData.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.description}>{project.description}</Text>
              {project.technologies && project.technologies.length > 0 && (
                <Text style={styles.technologies}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              )}
              {project.link && (
                <Text style={styles.technologies}>
                  Link: {project.link}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {resumeData.certifications.map((cert, index) => (
            <View key={index} style={styles.certificationItem}>
              <Text style={styles.certificationName}>{cert.name}</Text>
              <Text style={styles.issuer}>
                {cert.issuer} | {cert.date}
              </Text>
              {cert.credentialId && (
                <Text style={styles.credentialInfo}>
                  Credential ID: {cert.credentialId}
                </Text>
              )}
              {cert.link && (
                <Text style={styles.credentialInfo}>
                  Credential URL: {cert.link}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);