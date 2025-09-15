// rag.js - Fixed RAG Implementation for Aao Seekhe with Embedded Knowledge

class AaoSeekheRAG {
    constructor() {
        this.knowledgeBase = {};
        this.isLoaded = false;
        this.loadingPromise = null;
    }

    // Load all knowledge base - now using embedded data instead of external files
    async loadKnowledgeBase() {
        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        this.loadingPromise = this._loadEmbeddedData();
        return this.loadingPromise;
    }

    async _loadEmbeddedData() {
        try {
            console.log('🚀 Loading Aao Seekhe knowledge base from embedded data...');
            
            // Embedded knowledge data from the JSON files you provided
            this.knowledgeBase = {
                company: {
                    "about": {
                        "name": "Aao Seekhe",
                        "tagline": "Prep Smart, Succeed Globally!",
                        "description": "Your Pathway to Success in GRE, GMAT, and IELTS",
                        "full_description": "Aao Seekhe is a pioneering educational institute located in Lucknow, dedicated to providing top-tier coaching for GRE, GMAT, and IELTS exams along with Admission Consultancy Services.",
                        "founded": "2020",
                        "launched": "2024",
                        "headquarters": "Lucknow, Uttar Pradesh, India",
                        "parent_company": "Faumi Education and Training Private Limited",
                        "industry": "Professional Training and Coaching",
                        "company_size": "11-50 employees",
                        "linkedin_members": "44 associated members",
                        "funding_status": "Unfunded as of June 2025",
                        "website": "https://aaoseekhe.com/"
                    },
                    "founder_info": {
                        "founder": "Satish Anand",
                        "founder_experience": "23 Years of experience",
                        "founder_achievements": [
                            "6X Josh Talks Speaker",
                            "2X Josh Skills Expert", 
                            "International Author of 2 Top Selling Books",
                            "Seasoned educational expert"
                        ],
                        "co_founder": "Krati Yadav",
                        "co_founder_background": "International Author, Served US Based clients for 5 Years"
                    },
                    "services": [
                        "Test preparation for GRE, GMAT, IELTS, SAT",
                        "Study abroad consultation",
                        "Profile building",
                        "University selection",
                        "Application and visa guidance",
                        "Admission Consultancy Services"
                    ],
                    "statistics": {
                        "total_courses": "500+",
                        "students_served": "1900+",
                        "skilled_lecturers": "750+",
                        "awards_won": "30+"
                    }
                },

                courses: {
                    "gre": {
                        "full_name": "Graduate Record Examinations",
                        "description": "Comprehensive GRE coaching for graduate school admissions",
                        "format_options": ["Online", "Offline", "Hybrid"],
                        "key_areas": ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
                        "course_structure": "Comprehensive training programs tailored to meet diverse student needs",
                        "features": [
                            "Interactive sessions",
                            "Personalized guidance",
                            "Mock tests and practice sessions",
                            "Customized training modules"
                        ]
                    },
                    "gmat": {
                        "full_name": "Graduate Management Admission Test",
                        "description": "Top-tier GMAT coaching for business school admissions",
                        "format_options": ["Online", "Offline", "Hybrid"],
                        "key_areas": ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
                        "course_structure": "Flexible learning options with advanced learning platforms",
                        "features": [
                            "One-on-one tutoring available",
                            "Group classes",
                            "Intensive preparation programs",
                            "Proven track record of success"
                        ]
                    },
                    "ielts": {
                        "full_name": "International English Language Testing System",
                        "description": "Professional IELTS preparation for international study and immigration",
                        "format_options": ["Online", "Offline", "Hybrid"],
                        "key_areas": ["Listening", "Reading", "Writing", "Speaking"],
                        "course_structure": "Comprehensive training with focus on all four skills",
                        "features": [
                            "Mock interviews",
                            "Speaking practice sessions",
                            "Writing evaluation",
                            "Band score improvement strategies"
                        ]
                    },
                    "sat": {
                        "full_name": "Scholastic Assessment Test",
                        "description": "Expert SAT coaching for undergraduate admissions",
                        "format_options": ["Online", "Offline"],
                        "key_areas": ["Evidence-Based Reading and Writing", "Math", "Essay (optional)"],
                        "course_structure": "Specialized coaching for high school students",
                        "features": [
                            "Digital SAT preparation",
                            "Score improvement strategies",
                            "College admission guidance",
                            "Practice tests"
                        ]
                    },
                    "general_features": {
                        "flexibility": "Both online and offline training formats",
                        "customization": "Customized training solutions for unique learning needs",
                        "accessibility": "Advanced learning platforms for online courses",
                        "support": "Personalized guidance throughout preparation journey"
                    }
                },

                faculty: {
                    "leadership": {
                        "ceo_founder": {
                            "name": "Satish Anand",
                            "position": "CEO and Founder, Aao Seekhe",
                            "experience": "23 Years of experience",
                            "specializations": [
                                "Educational expert",
                                "Speaker and author",
                                "Test preparation specialist"
                            ],
                            "achievements": [
                                "6X Josh Talks Speaker",
                                "2X Josh Skills Expert",
                                "International Author of 2 Top Selling Books"
                            ]
                        },
                        "co_founder": {
                            "name": "Krati Yadav", 
                            "position": "Co-Founder, Aao Seekhe",
                            "background": "International Author",
                            "experience": "Served US Based clients for 5 Years",
                            "expertise": ["International education", "Client relations", "Educational content"]
                        }
                    },
                    "teaching_faculty": {
                        "verbal_expert_1": {
                            "name": "Amit Kumar Raghuvanshi",
                            "position": "Verbal faculty (GMAT, GRE, SAT)",
                            "specialization": "Expert verbal faculty specializing in GMAT, GRE, and SAT with proven success",
                            "subjects": ["Verbal Reasoning", "Reading Comprehension", "Critical Reasoning", "Sentence Correction"]
                        },
                        "verbal_expert_2": {
                            "name": "Preet Kaur",
                            "position": "Senior Verbal Faculty & Communication Expert",
                            "experience": "Over 15 years of experience in training, teaching, and content development",
                            "specialization": "Verbal aptitude, communication, and soft skills training for competitive exams",
                            "subjects": ["Verbal Reasoning", "Communication Skills", "Interview Preparation", "Soft Skills Training"],
                            "expertise": [
                                "Train the Trainer (TTT) programs",
                                "Content development and learning modules",
                                "Academic team management",
                                "Creative teaching methodologies"
                            ],
                            "qualifications": [
                                "General Management Program for Executives from IIM Lucknow",
                                "Master's degree in Science",
                                "English language training certifications",
                                "C2 level English language proficiency",
                                "MS Office tools certification"
                            ],
                            "achievements": [
                                "Consistent high ratings for teaching performance",
                                "Recipient of appreciation awards",
                                "Specialist in Fun with English learning modules",
                                "Expert in verbal content creation for tests and articles"
                            ]
                        },
                        "quant_expert": {
                            "name": "Pardeep Swami",
                            "position": "QUANT FACULTY (DSAT, GRE, AND GMAT)",
                            "specialization": "Expert quantitative faculty specializing in GMAT, GRE, and SAT with proven success",
                            "subjects": ["Quantitative Reasoning", "Math", "Data Interpretation", "Problem Solving"]
                        }
                    }
                }, // Fixed: Added missing closing brace and comma

                contact: {
                    "office_address": {
                        "full_address": "205 Regency Plaza, Park Road 5, Hazratganj, Lucknow-226001, Uttar Pradesh",
                        "building": "Regency Plaza",
                        "floor": "205",
                        "area": "Hazratganj",
                        "city": "Lucknow",
                        "state": "Uttar Pradesh",
                        "pincode": "226001",
                        "landmark": "Park Road 5"
                    },
                    "contact_details": {
                        "primary_phone": "+91 7307 870 773",
                        "secondary_phone": "+91 9005252364",
                        "email_info": "info@aaoseekhe.com",
                        "email_hr": "hr@aaoseekhe.com",
                        "website": "https://aaoseekhe.com/"
                    },
                    "office_hours": {
                        "working_days": "Tuesday to Sunday",
                        "timings": "11:00 AM - 08:00 PM",
                        "closed_day": "Monday",
                        "note": "Monday: Will be offline"
                    },
                    "location_benefits": {
                        "description": "Located in the heart of Lucknow",
                        "area_advantage": "Hazratganj is a prime commercial area",
                        "accessibility": "Easy to reach via public transport",
                        "facilities": "New office is a hub of innovation and learning"
                    }
                },

                features: {
                    "key_features": {
                        "online_offline_training": {
                            "title": "Online and Offline Training",
                            "description": "Aao Seekhe provides flexible learning options with both online and offline training formats. Our online courses utilize advanced learning platforms to deliver interactive sessions and personalized guidance, accessible from anywhere."
                        },
                        "customized_solutions": {
                            "title": "Customized Training Solutions",
                            "description": "Recognizing that every student has unique learning needs, we offer customized training solutions designed to optimize your preparation journey. Whether you require intensive one-on-one tutoring or group classes, our tailored programs cater to your specific requirements."
                        },
                        "affordable_pricing": {
                            "title": "Affordable Pricing",
                            "description": "Aao Seekhe is committed to offering high-quality education at affordable prices. We believe that access to superior test preparation should not be limited by financial constraints, making our courses accessible to aspiring students from diverse backgrounds."
                        },
                        "experienced_faculty": {
                            "title": "Experienced Faculty",
                            "description": "Our team of instructors comprises highly qualified experts with extensive experience in GRE, GMAT, and IELTS coaching. They bring a wealth of knowledge and a proven track record of success in helping students excel in these competitive exams."
                        },
                        "comprehensive_training": {
                            "title": "Comprehensive Training",
                            "description": "We offer a range of comprehensive training programs tailored to meet the diverse needs of our students. Whether you prefer online classes for flexibility or offline sessions for a traditional classroom experience, Aao Seekhe ensures effective preparation through customized training modules."
                        }
                    },
                    "learning_formats": {
                        "online": {
                            "features": [
                                "Live interactive sessions",
                                "Advanced learning platforms",
                                "Accessible from anywhere",
                                "Personalized guidance",
                                "Flexible scheduling"
                            ]
                        },
                        "offline": {
                            "features": [
                                "Traditional classroom experience",
                                "Face-to-face interaction",
                                "In-person doubt clearing",
                                "Group discussions",
                                "Direct faculty access"
                            ]
                        }
                    }
                },

                achievements: {
                    "company_milestones": {
                        "founding": "Founded in 2020",
                        "official_launch": "Officially launched in 2024",
                        "anniversary": "Celebrated one-year anniversary in early 2025",
                        "growth": "Continuous expansion of offerings and student support"
                    },
                    "founder_recognition": {
                        "satish_anand": {
                            "speaking_engagements": "6X Josh Talks Speaker",
                            "skills_expertise": "2X Josh Skills Expert",
                            "publications": "International Author of 2 Top Selling Books",
                            "recent_focus": "Highlighted importance of collaboration in building skills and fostering win-win environment for students (early 2025)"
                        }
                    },
                    "statistics": {
                        "courses_offered": "500+ Total Courses",
                        "students_impacted": "1900+ Our Students",
                        "faculty_strength": "750+ Skilled Lecturers", 
                        "awards": "30+ Win Awards"
                    },
                    "employee_feedback": {
                        "overall_rating": "3.3 out of 5 stars (AmbitionBox)",
                        "positives": [
                            "Work culture rated average-to-good",
                            "Work-life balance received good ratings"
                        ],
                        "areas_for_improvement": [
                            "Job security ratings",
                            "Work satisfaction scores",
                            "Promotion opportunities"
                        ]
                    },
                    "vision_mission": {
                        "belief": "With the right guidance and resources, you can achieve anything you set your mind to",
                        "motto": "Let's learn and grow together!",
                        "approach": "Combines years of experience with passion for guiding students towards academic and professional goals"
                    }
                }
            };

            this.isLoaded = true;
            console.log('🎉 Knowledge base loaded successfully with embedded data!');
            
        } catch (error) {
            console.error('❌ Failed to load knowledge base:', error);
            this.isLoaded = false;
        }
    }

    // Advanced query analysis and information retrieval
    retrieveRelevantInfo(userQuery) {
        if (!this.isLoaded) {
            console.warn('Knowledge base not loaded yet');
            return this._getFallbackContext();
        }

        const query = userQuery.toLowerCase();
        let relevantContext = {
            sections: [],
            confidence: 0,
            query_type: this._classifyQuery(query)
        };

        // Course-specific queries
        this._retrieveCourseInfo(query, relevantContext);
        
        // Faculty and founder information
        this._retrieveFacultyInfo(query, relevantContext);
        
        // Contact and location queries
        this._retrieveContactInfo(query, relevantContext);
        
        // Company and about queries
        this._retrieveCompanyInfo(query, relevantContext);
        
        // Features and services queries
        this._retrieveFeaturesInfo(query, relevantContext);
        
        // Achievements and statistics
        this._retrieveAchievementsInfo(query, relevantContext);

        return relevantContext.sections.length > 0 ? relevantContext : this._getFallbackContext();
    }

    _classifyQuery(query) {
        const patterns = {
            course: ['gre', 'gmat', 'ielts', 'sat', 'exam', 'test', 'preparation', 'coaching'],
            pricing: ['price', 'fee', 'cost', 'expensive', 'cheap', 'affordable', 'payment'],
            contact: ['contact', 'phone', 'email', 'address', 'location', 'office', 'visit'],
            faculty: ['teacher', 'faculty', 'instructor', 'founder', 'satish', 'krati', 'expert', 'staff'],
            about: ['about', 'company', 'founded', 'history', 'story', 'background'],
            admission: ['admission', 'counseling', 'university', 'study abroad', 'visa'],
            features: ['online', 'offline', 'flexible', 'customized', 'training']
        };

        for (const [type, keywords] of Object.entries(patterns)) {
            if (keywords.some(keyword => query.includes(keyword))) {
                return type;
            }
        }
        return 'general';
    }

    _retrieveCourseInfo(query, context) {
        const courses = ['gre', 'gmat', 'ielts', 'sat'];
        courses.forEach(course => {
            if (query.includes(course)) {
                if (this.knowledgeBase.courses?.[course]) {
                    context.sections.push({
                        type: 'course',
                        subject: course.toUpperCase(),
                        data: this.knowledgeBase.courses[course],
                        relevance: 0.9
                    });
                    context.confidence += 0.3;
                }
            }
        });

        // General course features
        if (query.includes('course') || query.includes('training') || query.includes('preparation')) {
            if (this.knowledgeBase.courses?.general_features) {
                context.sections.push({
                    type: 'course_features',
                    subject: 'General Course Information',
                    data: this.knowledgeBase.courses.general_features,
                    relevance: 0.6
                });
                context.confidence += 0.2;
            }
        }
    }

    _retrieveFacultyInfo(query, context) {
        const facultyKeywords = ['teacher', 'faculty', 'instructor', 'founder', 'satish', 'krati', 'expert', 'staff', 'founded', 'who'];
        
        if (facultyKeywords.some(keyword => query.includes(keyword))) {
            if (this.knowledgeBase.faculty) {
                context.sections.push({
                    type: 'faculty',
                    subject: 'Faculty & Leadership',
                    data: this.knowledgeBase.faculty,
                    relevance: 0.8
                });
                context.confidence += 0.3;
            }
            
            // Also add company founder info
            if (this.knowledgeBase.company?.founder_info) {
                context.sections.push({
                    type: 'founder_info',
                    subject: 'Founder Information',
                    data: this.knowledgeBase.company.founder_info,
                    relevance: 0.9
                });
                context.confidence += 0.3;
            }
        }
    }

    _retrieveContactInfo(query, context) {
        const contactKeywords = ['contact', 'phone', 'email', 'address', 'location', 'office', 'visit', 'call'];
        
        if (contactKeywords.some(keyword => query.includes(keyword))) {
            if (this.knowledgeBase.contact) {
                context.sections.push({
                    type: 'contact',
                    subject: 'Contact & Location Information',
                    data: this.knowledgeBase.contact,
                    relevance: 0.9
                });
                context.confidence += 0.3;
            }
        }
    }

    _retrieveCompanyInfo(query, context) {
        const companyKeywords = ['about', 'company', 'founded', 'history', 'story', 'background', 'mission', 'vision'];
        
        if (companyKeywords.some(keyword => query.includes(keyword))) {
            if (this.knowledgeBase.company) {
                context.sections.push({
                    type: 'company',
                    subject: 'About Aao Seekhe',
                    data: this.knowledgeBase.company,
                    relevance: 0.8
                });
                context.confidence += 0.3;
            }
        }
    }

    _retrieveFeaturesInfo(query, context) {
        const featureKeywords = ['online', 'offline', 'flexible', 'customized', 'training', 'features', 'benefits'];
        
        if (featureKeywords.some(keyword => query.includes(keyword))) {
            if (this.knowledgeBase.features) {
                context.sections.push({
                    type: 'features',
                    subject: 'Features & Services',
                    data: this.knowledgeBase.features,
                    relevance: 0.7
                });
                context.confidence += 0.2;
            }
        }
    }

    _retrieveAchievementsInfo(query, context) {
        const achievementKeywords = ['achievement', 'success', 'award', 'recognition', 'statistics', 'students', 'experience'];
        
        if (achievementKeywords.some(keyword => query.includes(keyword))) {
            if (this.knowledgeBase.achievements) {
                context.sections.push({
                    type: 'achievements',
                    subject: 'Achievements & Recognition',
                    data: this.knowledgeBase.achievements,
                    relevance: 0.6
                });
                context.confidence += 0.2;
            }
        }
    }

    _getFallbackContext() {
        // Return basic company info if nothing specific is found
        return {
            sections: [{
                type: 'general',
                subject: 'General Information',
                data: {
                    message: "Aao Seekhe is a pioneering educational institute in Lucknow providing GRE, GMAT, IELTS, and SAT preparation along with study abroad consultation.",
                    services: ["Test Preparation", "Study Abroad Consultation", "Profile Building", "University Selection"]
                },
                relevance: 0.5
            }],
            confidence: 0.3,
            query_type: 'general'
        };
    }

    // Format retrieved information for AI prompt
    formatContextForPrompt(retrievedInfo) {
        if (!retrievedInfo || retrievedInfo.sections.length === 0) {
            return '\n--- GENERAL AAO SEEKHE INFO ---\nAao Seekhe provides test preparation and study abroad consultation services.\n';
        }

        let contextString = '\n--- RELEVANT AAO SEEKHE INFORMATION ---\n';
        contextString += `Query Type: ${retrievedInfo.query_type.toUpperCase()}\n`;
        contextString += `Confidence Score: ${(retrievedInfo.confidence * 100).toFixed(0)}%\n\n`;

        // Sort sections by relevance
        const sortedSections = retrievedInfo.sections.sort((a, b) => b.relevance - a.relevance);

        sortedSections.forEach((section, index) => {
            contextString += `[${index + 1}. ${section.subject}] (Relevance: ${(section.relevance * 100).toFixed(0)}%)\n`;
            contextString += this._formatSectionData(section.data);
            contextString += '\n---\n';
        });

        contextString += '\nIMPORTANT: Use this specific information to provide accurate answers about Aao Seekhe services. Always mention the correct contact details, founder names, and course specifics from the context above.\n';
        
        return contextString;
    }

    _formatSectionData(data) {
        if (typeof data === 'string') {
            return data + '\n';
        }
        
        if (Array.isArray(data)) {
            return data.map(item => `• ${item}`).join('\n') + '\n';
        }

        if (typeof data === 'object') {
            return this._formatObjectData(data, 0);
        }

        return JSON.stringify(data, null, 2) + '\n';
    }

    _formatObjectData(obj, depth = 0) {
        const indent = '  '.repeat(depth);
        let result = '';

        for (const [key, value] of Object.entries(obj)) {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                result += `${indent}${formattedKey}:\n`;
                result += this._formatObjectData(value, depth + 1);
            } else if (Array.isArray(value)) {
                result += `${indent}${formattedKey}:\n`;
                value.forEach(item => {
                    result += `${indent}  • ${item}\n`;
                });
            } else {
                result += `${indent}${formattedKey}: ${value}\n`;
            }
        }

        return result;
    }

    // Get knowledge base status
    getStatus() {
        return {
            isLoaded: this.isLoaded,
            sectionsLoaded: Object.keys(this.knowledgeBase).length,
            availableSections: Object.keys(this.knowledgeBase)
        };
    }
}

// Global RAG instance
const aaoseekheRAG = new AaoSeekheRAG();