import { useState, useEffect } from "react";
import { ResumeData, defaultResumeData } from "@/utils/resumeUtils";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";
import ResumePreview from "./ResumePreview";
import { Button } from "./ui/button";
import { Edit, Eye, Save } from "lucide-react";
import { toast } from "sonner";
const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    // Try to load saved resume data when component mounts
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as ResumeData;
        // Ensure backward compatibility with older saved data
        if (!parsedData.selectedTemplate) {
          parsedData.selectedTemplate = "classic";
        }
        setResumeData(parsedData);
      } catch (e) {
        console.error("Error loading saved resume data:", e);
      }
    }
  }, []);
  const updateContactInfo = (info: Partial<ResumeData["contactInfo"]>) => {
    setResumeData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        ...info
      }
    }));
  };
  const updateAboutContent = (content: string) => {
    setResumeData(prev => ({
      ...prev,
      aboutContent: content
    }));
  };
  const updateExperienceItems = (items: ResumeData["experienceItems"]) => {
    setResumeData(prev => ({
      ...prev,
      experienceItems: items
    }));
  };
  const updateEducationItems = (items: ResumeData["educationItems"]) => {
    setResumeData(prev => ({
      ...prev,
      educationItems: items
    }));
  };
  const updateSkillItems = (items: ResumeData["skillItems"]) => {
    setResumeData(prev => ({
      ...prev,
      skillItems: items
    }));
  };
  const updateProjectItems = (items: ResumeData["projectItems"]) => {
    setResumeData(prev => ({
      ...prev,
      projectItems: items
    }));
  };
  const updateCertificationItems = (items: ResumeData["certificationItems"]) => {
    setResumeData(prev => ({
      ...prev,
      certificationItems: items
    }));
  };
  const selectTemplate = (templateId: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }));
    toast.success(`Template changed to ${templateId}`);
  };
  const saveToLocalStorage = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    toast.success("Resume saved to browser storage");
  };
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try {
        const parsedData = JSON.parse(saved) as ResumeData;
        setResumeData(parsedData);
        toast.success("Resume loaded from browser storage");
      } catch (e) {
        toast.error("Failed to load saved resume");
      }
    } else {
      toast.info("No saved resume found");
    }
  };
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  return <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-lime-600">ResumeGenie</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={loadFromLocalStorage}>
            Load Saved
          </Button>
          
          <Button variant={isEditing ? "default" : "outline"} className="flex items-center gap-2" onClick={toggleEditMode}>
            {isEditing ? <>
                <Eye className="h-4 w-4" />
                Preview
              </> : <>
                <Edit className="h-4 w-4" />
                Edit
              </>}
          </Button>
          
          <Button onClick={saveToLocalStorage} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {isEditing ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Personal Details</h2>
              <ContactSection contactInfo={resumeData.contactInfo} updateContactInfo={updateContactInfo} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <SkillsSection items={resumeData.skillItems} updateItems={updateSkillItems} isEditing={true} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <CertificationSection items={resumeData.certificationItems} updateItems={updateCertificationItems} isEditing={true} />
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <AboutSection content={resumeData.aboutContent} updateContent={updateAboutContent} isEditing={true} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <ExperienceSection items={resumeData.experienceItems} updateItems={updateExperienceItems} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <ProjectSection items={resumeData.projectItems} updateItems={updateProjectItems} isEditing={true} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <EducationSection items={resumeData.educationItems} updateItems={updateEducationItems} isEditing={true} />
            </div>
          </div>
        </div> : <div className="bg-resume-light dark:bg-gray-800 rounded-lg p-4">
          <ResumePreview resumeData={resumeData} updateContactInfo={updateContactInfo} updateAboutContent={updateAboutContent} updateExperienceItems={updateExperienceItems} updateEducationItems={updateEducationItems} updateSkillItems={updateSkillItems} updateProjectItems={updateProjectItems} updateCertificationItems={updateCertificationItems} isEditing={false} selectTemplate={selectTemplate} />
        </div>}
    </div>;
};
export default ResumeEditor;