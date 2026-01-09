// =========================================
// ICAI CDN Direct PDF URL Configuration
// =========================================
const PDF_CDN = "https://resource.cdn.icai.org/";

// Direct PDF URLs for CA Intermediate Advanced Accounting (as example)
// Pattern: https://resource.cdn.icai.org/[id]bos[session]-inter-p[paper]-cp[chapter].pdf
const DIRECT_PDF_URLS = {
    // CA Intermediate Paper 1 - Advanced Accounting (New Scheme)
    "int-p1": {
        1: "74684bos60485-inter-p1-ip.pdf",      // Initial Pages
        2: "74685bos60485-inter-p1-cp1.pdf",     // Chapter 1
        3: "74686bos60485-inter-p1-cp2.pdf",     // Chapter 2
        4: "74687bos60485-inter-p1-cp3.pdf",     // Chapter 3
        5: "74688bos60485-inter-p1-cp4-u1.pdf",  // Chapter 4 Unit 1
        6: "74689bos60485-inter-p1-cp4-u2.pdf",  // Chapter 4 Unit 2
        7: "74690bos60485-inter-p1-cp4-u3.pdf",  // Chapter 4 Unit 3
        8: "74691bos60485-inter-p1-cp4-u4.pdf",  // Chapter 4 Unit 4
        9: "74692bos60485-inter-p1-cp4-u5.pdf",  // Chapter 4 Unit 5
        10: "74693bos60485-inter-p1-cp4-u6.pdf", // Chapter 4 Unit 6
        11: "74694bos60485-inter-p1-cp4-u7.pdf"  // Chapter 4 Unit 7
    }
};

// Helper to get direct PDF URL
function getDirectPdfUrl(subjectId, pdfId) {
    if (DIRECT_PDF_URLS[subjectId] && DIRECT_PDF_URLS[subjectId][pdfId]) {
        return PDF_CDN + DIRECT_PDF_URLS[subjectId][pdfId];
    }
    // Fallback - will still work for demonstration
    return null;
}

// =========================================
// DIRECT DOWNLOAD FUNCTION (No page redirect)
// Uses local server to bypass CORS restrictions
// =========================================
// Use relative path for Vercel deployment (works locally with vercel dev too)
const SERVER_URL = '';

function downloadPDF(url, filename) {
    // Show loading toast
    showDownloadProgress(filename);

    // Use local server proxy to download PDF
    const proxyUrl = `${SERVER_URL}/api/download-pdf?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

    // Use fetch with blob to download in background
    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Server not running or PDF not found');
            }
            return response.blob();
        })
        .then(blob => {
            // Create download link from blob
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename.replace(/[^a-zA-Z0-9\s\-_]/g, '') + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            // Remove loading toast and show success
            removeProgressToast();
            showDownloadSuccess(filename);
        })
        .catch(error => {
            console.log('Server download failed:', error.message);
            removeProgressToast();
            showServerError(filename, url);
        });
}

// Show download progress notification
function showDownloadProgress(filename) {
    removeProgressToast(); // Remove any existing
    const toast = document.createElement('div');
    toast.className = 'download-toast progress';
    toast.id = 'progress-toast';
    toast.innerHTML = `
        <div class="spinner"></div>
        <div>
            <strong>Downloading...</strong><br>
            <small>${filename}</small>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
}

function removeProgressToast() {
    const existing = document.getElementById('progress-toast');
    if (existing) {
        existing.classList.remove('show');
        setTimeout(() => existing.remove(), 300);
    }
}

// Show download success notification
function showDownloadSuccess(filename) {
    const toast = document.createElement('div');
    toast.className = 'download-toast success';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> Downloaded: ${filename}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show server error - suggest starting the server
function showServerError(filename, url) {
    const toast = document.createElement('div');
    toast.className = 'download-toast error';
    toast.innerHTML = `
        <i class="fa-solid fa-exclamation-triangle"></i>
        <div>
            <strong>Server not running!</strong><br>
            <small>Run 'npm start' in terminal first</small>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}



// DATA: CA Foundation (New Scheme 2024)
// =========================================
const foundationData = [
    {
        id: "fnd-p1", title: "Accounting", code: "Paper 1", color: "book-color-1",
        paperId: 1,
        modules: [
            {
                name: "MODULE 1",
                chapters: [
                    { name: "Initial Pages", pdfId: 1 },
                    { name: "Chapter 1: Introduction to Accounting", pdfId: 2 },
                    { name: "Chapter 2: Accounting Concepts, Principles and Conventions", pdfId: 3 },
                    { name: "Chapter 3: Accounting as a Measurement Discipline", pdfId: 4 },
                    { name: "Chapter 4: Accounting Standards and IFRS", pdfId: 5 }
                ]
            },
            {
                name: "MODULE 2",
                chapters: [
                    { name: "Chapter 5: Books of Accounts", pdfId: 6 },
                    { name: "Chapter 6: Bank Reconciliation Statement", pdfId: 7 },
                    { name: "Chapter 7: Inventories", pdfId: 8 },
                    { name: "Chapter 8: Depreciation and Amortisation", pdfId: 9 }
                ]
            },
            {
                name: "MODULE 3",
                chapters: [
                    { name: "Chapter 9: Bills of Exchange and Promissory Notes", pdfId: 10 },
                    { name: "Chapter 10: Sale on Approval Basis", pdfId: 11 },
                    { name: "Chapter 11: Consignment", pdfId: 12 },
                    { name: "Chapter 12: Joint Venture", pdfId: 13 }
                ]
            },
            {
                name: "MODULE 4",
                chapters: [
                    { name: "Chapter 13: Partnership Accounts", pdfId: 14 },
                    { name: "Chapter 14: Reconstitution of Partnership", pdfId: 15 },
                    { name: "Chapter 15: Dissolution of Partnership", pdfId: 16 },
                    { name: "Chapter 16: Non-Profit Organisations", pdfId: 17 },
                    { name: "Chapter 17: Introduction to Company Accounts", pdfId: 18 }
                ]
            }
        ]
    },
    {
        id: "fnd-p2", title: "Business Laws", code: "Paper 2", color: "book-color-2",
        paperId: 2,
        modules: [
            {
                name: "MODULE 1: Indian Contract Act",
                isSection: true,
                chapters: [
                    { name: "Chapter 1: Nature of Contracts", pdfId: 1 },
                    { name: "Chapter 2: Offer and Acceptance", pdfId: 2 },
                    { name: "Chapter 3: Consideration", pdfId: 3 },
                    { name: "Chapter 4: Capacity to Contract", pdfId: 4 },
                    { name: "Chapter 5: Free Consent", pdfId: 5 },
                    { name: "Chapter 6: Void Agreements", pdfId: 6 },
                    { name: "Chapter 7: Contingent Contracts", pdfId: 7 },
                    { name: "Chapter 8: Performance of Contracts", pdfId: 8 },
                    { name: "Chapter 9: Breach of Contract", pdfId: 9 }
                ]
            },
            {
                name: "MODULE 2: Sale of Goods Act",
                isSection: true,
                chapters: [
                    { name: "Chapter 10: Formation of Contract of Sale", pdfId: 10 },
                    { name: "Chapter 11: Conditions and Warranties", pdfId: 11 },
                    { name: "Chapter 12: Transfer of Property", pdfId: 12 },
                    { name: "Chapter 13: Unpaid Seller", pdfId: 13 }
                ]
            },
            {
                name: "MODULE 3: Other Laws",
                isSection: true,
                chapters: [
                    { name: "Chapter 14: Indian Partnership Act, 1932", pdfId: 14 },
                    { name: "Chapter 15: LLP Act, 2008", pdfId: 15 },
                    { name: "Chapter 16: Negotiable Instruments Act", pdfId: 16 }
                ]
            }
        ]
    },
    {
        id: "fnd-p3", title: "Quantitative Aptitude", code: "Paper 3", color: "book-color-3",
        paperId: 3,
        modules: [
            {
                name: "PART A: Business Mathematics",
                isSection: true,
                chapters: [
                    { name: "Chapter 1: Ratio and Proportion, Indices, Logarithms", pdfId: 1 },
                    { name: "Chapter 2: Equations and Matrices", pdfId: 2 },
                    { name: "Chapter 3: Linear Inequalities", pdfId: 3 },
                    { name: "Chapter 4: Time Value of Money", pdfId: 4 },
                    { name: "Chapter 5: Permutations and Combinations", pdfId: 5 },
                    { name: "Chapter 6: Sequence and Series", pdfId: 6 },
                    { name: "Chapter 7: Sets and Functions", pdfId: 7 },
                    { name: "Chapter 8: Differential and Integral Calculus", pdfId: 8 }
                ]
            },
            {
                name: "PART B: Logical Reasoning",
                isSection: true,
                chapters: [
                    { name: "Chapter 9: Number Series, Coding and Decoding", pdfId: 9 },
                    { name: "Chapter 10: Direction Tests", pdfId: 10 },
                    { name: "Chapter 11: Seating Arrangements", pdfId: 11 },
                    { name: "Chapter 12: Blood Relations", pdfId: 12 },
                    { name: "Chapter 13: Syllogism", pdfId: 13 }
                ]
            },
            {
                name: "PART C: Statistics",
                isSection: true,
                chapters: [
                    { name: "Chapter 14: Statistical Description of Data", pdfId: 14 },
                    { name: "Chapter 15: Measures of Central Tendency", pdfId: 15 },
                    { name: "Chapter 16: Measures of Dispersion", pdfId: 16 },
                    { name: "Chapter 17: Probability", pdfId: 17 },
                    { name: "Chapter 18: Theoretical Distributions", pdfId: 18 },
                    { name: "Chapter 19: Correlation and Regression", pdfId: 19 },
                    { name: "Chapter 20: Index Numbers and Time Series", pdfId: 20 }
                ]
            }
        ]
    },
    {
        id: "fnd-p4", title: "Business Economics", code: "Paper 4", color: "book-color-4",
        paperId: 4,
        modules: [
            {
                name: "MODULE 1",
                chapters: [
                    { name: "Chapter 1: Nature and Scope of Business Economics", pdfId: 1 },
                    { name: "Chapter 2: Theory of Demand and Supply", pdfId: 2 },
                    { name: "Chapter 3: Elasticity of Demand and Supply", pdfId: 3 }
                ]
            },
            {
                name: "MODULE 2",
                chapters: [
                    { name: "Chapter 4: Theory of Production and Cost", pdfId: 4 },
                    { name: "Chapter 5: Price Determination - Perfect Competition", pdfId: 5 },
                    { name: "Chapter 6: Price Determination - Imperfect Competition", pdfId: 6 }
                ]
            },
            {
                name: "MODULE 3",
                chapters: [
                    { name: "Chapter 7: Business Cycles", pdfId: 7 },
                    { name: "Chapter 8: National Income", pdfId: 8 },
                    { name: "Chapter 9: Public Finance", pdfId: 9 },
                    { name: "Chapter 10: Money Market", pdfId: 10 },
                    { name: "Chapter 11: International Trade", pdfId: 11 }
                ]
            }
        ]
    }
];

// =========================================
// DATA: CA Intermediate (New Scheme 2024)
// =========================================
const intermediateData = [
    {
        id: "int-p1", title: "Advanced Accounting", code: "Paper 1", color: "book-color-1",
        paperId: 5,
        modules: [
            {
                name: "MODULE 1",
                chapters: [
                    { name: "Initial Pages", pdfId: 1 },
                    { name: "Chapter 1: Introduction to Accounting Standards", pdfId: 2 },
                    { name: "Chapter 2: Framework for Preparation", pdfId: 3 },
                    { name: "Chapter 3: Applicability of Accounting Standards", pdfId: 4 },
                    {
                        name: "Chapter 4: Presentation & Disclosures Based AS",
                        isChapterHeader: true,
                        units: [
                            { name: "Unit 1: AS 1 Disclosure of Accounting Policies", pdfId: 5 },
                            { name: "Unit 2: AS 3 Cash Flow Statement", pdfId: 6 },
                            { name: "Unit 3: AS 17 Segment Reporting", pdfId: 7 },
                            { name: "Unit 4: AS 18 Related Party Disclosures", pdfId: 8 },
                            { name: "Unit 5: AS 20 Earnings Per Share", pdfId: 9 },
                            { name: "Unit 6: AS 24 Discontinuing Operations", pdfId: 10 },
                            { name: "Unit 7: AS 25 Interim Financial Reporting", pdfId: 11 }
                        ]
                    }
                ]
            },
            {
                name: "MODULE 2",
                chapters: [
                    {
                        name: "Chapter 5: Assets Based Accounting Standards",
                        isChapterHeader: true,
                        units: [
                            { name: "Unit 1: AS 2 Valuation of Inventories", pdfId: 12 },
                            { name: "Unit 2: AS 10 Property, Plant and Equipment", pdfId: 13 },
                            { name: "Unit 3: AS 13 Accounting for Investments", pdfId: 14 },
                            { name: "Unit 4: AS 16 Borrowing Costs", pdfId: 15 },
                            { name: "Unit 5: AS 19 Leases", pdfId: 16 },
                            { name: "Unit 6: AS 26 Intangible Assets", pdfId: 17 },
                            { name: "Unit 7: AS 28 Impairment of Assets", pdfId: 18 }
                        ]
                    }
                ]
            },
            {
                name: "MODULE 3",
                chapters: [
                    {
                        name: "Chapter 6: Liabilities Based Accounting Standards",
                        isChapterHeader: true,
                        units: [
                            { name: "Unit 1: AS 15 Employee Benefits", pdfId: 19 },
                            { name: "Unit 2: AS 29 Provisions and Contingencies", pdfId: 20 }
                        ]
                    },
                    {
                        name: "Chapter 7: Profit or Loss Related Accounting Standards",
                        isChapterHeader: true,
                        units: [
                            { name: "Unit 1: AS 5 Net Profit or Loss", pdfId: 21 },
                            { name: "Unit 2: AS 9 Revenue Recognition", pdfId: 22 },
                            { name: "Unit 3: AS 22 Accounting for Taxes on Income", pdfId: 23 }
                        ]
                    }
                ]
            },
            {
                name: "MODULE 4",
                chapters: [
                    { name: "Chapter 8: Company Accounts - Issue of Shares", pdfId: 24 },
                    { name: "Chapter 9: Issue of Debentures", pdfId: 25 },
                    { name: "Chapter 10: Redemption of Preference Shares", pdfId: 26 },
                    { name: "Chapter 11: Redemption of Debentures", pdfId: 27 }
                ]
            },
            {
                name: "MODULE 5",
                chapters: [
                    { name: "Chapter 12: Financial Statements of Companies", pdfId: 28 },
                    { name: "Chapter 13: Profit or Loss Pre and Post Incorporation", pdfId: 29 },
                    { name: "Chapter 14: Bonus Issue and Right Issue", pdfId: 30 }
                ]
            },
            {
                name: "MODULE 6",
                chapters: [
                    { name: "Chapter 15: Amalgamation of Companies", pdfId: 31 },
                    { name: "Chapter 16: Internal Reconstruction", pdfId: 32 },
                    { name: "Chapter 17: Liquidation of Companies", pdfId: 33 }
                ]
            },
            {
                name: "MODULE 7",
                chapters: [
                    { name: "Chapter 18: Banking Company Accounts", pdfId: 34 },
                    { name: "Chapter 19: Insurance Company Accounts", pdfId: 35 }
                ]
            }
        ]
    },
    {
        id: "int-p2", title: "Corporate and Other Laws", code: "Paper 2", color: "book-color-2",
        paperId: 6,
        modules: [
            {
                name: "PART I: Company Law",
                isSection: true,
                chapters: [
                    { name: "Chapter 1: Preliminary", pdfId: 1 },
                    { name: "Chapter 2: Incorporation of Company", pdfId: 2 },
                    { name: "Chapter 3: Prospectus and Allotment", pdfId: 3 },
                    { name: "Chapter 4: Share Capital and Debentures", pdfId: 4 },
                    { name: "Chapter 5: Acceptance of Deposits", pdfId: 5 },
                    { name: "Chapter 6: Registration of Charges", pdfId: 6 },
                    { name: "Chapter 7: Management and Administration", pdfId: 7 },
                    { name: "Chapter 8: Declaration and Payment of Dividend", pdfId: 8 },
                    { name: "Chapter 9: Accounts of Companies", pdfId: 9 },
                    { name: "Chapter 10: Audit and Auditors", pdfId: 10 },
                    { name: "Chapter 11: Companies Incorporated Outside India", pdfId: 11 }
                ]
            },
            {
                name: "PART II: Other Laws",
                isSection: true,
                chapters: [
                    { name: "Chapter 12: The General Clauses Act, 1897", pdfId: 12 },
                    { name: "Chapter 13: Interpretation of Statutes", pdfId: 13 }
                ]
            }
        ]
    },
    {
        id: "int-p3", title: "Taxation", code: "Paper 3", color: "book-color-3",
        paperId: 7,
        modules: [
            {
                name: "SECTION A: Income Tax Law",
                isSection: true,
                chapters: [
                    { name: "Chapter 1: Basic Concepts", pdfId: 1 },
                    { name: "Chapter 2: Residence and Scope of Total Income", pdfId: 2 },
                    { name: "Chapter 3: Incomes Exempt from Tax", pdfId: 3 },
                    { name: "Chapter 4: Salaries", pdfId: 4 },
                    { name: "Chapter 5: Income from House Property", pdfId: 5 },
                    { name: "Chapter 6: Profits and Gains of Business", pdfId: 6 },
                    { name: "Chapter 7: Capital Gains", pdfId: 7 },
                    { name: "Chapter 8: Income from Other Sources", pdfId: 8 },
                    { name: "Chapter 9: Clubbing of Incomes", pdfId: 9 },
                    { name: "Chapter 10: Set Off and Carry Forward of Losses", pdfId: 10 },
                    { name: "Chapter 11: Deductions from Gross Total Income", pdfId: 11 },
                    { name: "Chapter 12: Computation of Total Income", pdfId: 12 }
                ]
            },
            {
                name: "SECTION B: Goods and Services Tax",
                isSection: true,
                chapters: [
                    { name: "Chapter 13: GST in India - Introduction", pdfId: 13 },
                    { name: "Chapter 14: Supply under GST", pdfId: 14 },
                    { name: "Chapter 15: Charge of GST", pdfId: 15 },
                    { name: "Chapter 16: Exemptions from GST", pdfId: 16 },
                    { name: "Chapter 17: Time and Value of Supply", pdfId: 17 },
                    { name: "Chapter 18: Input Tax Credit", pdfId: 18 },
                    { name: "Chapter 19: Registration", pdfId: 19 },
                    { name: "Chapter 20: Tax Invoice and Other Documents", pdfId: 20 },
                    { name: "Chapter 21: Returns", pdfId: 21 },
                    { name: "Chapter 22: Payment of Tax", pdfId: 22 }
                ]
            }
        ]
    },
    {
        id: "int-p4", title: "Cost and Management Accounting", code: "Paper 4", color: "book-color-4",
        paperId: 8,
        modules: [
            {
                name: "MODULE 1",
                chapters: [
                    { name: "Chapter 1: Introduction to Cost and Management Accounting", pdfId: 1 },
                    { name: "Chapter 2: Material Cost", pdfId: 2 },
                    { name: "Chapter 3: Employee Cost", pdfId: 3 },
                    { name: "Chapter 4: Direct Expenses and Overheads", pdfId: 4 }
                ]
            },
            {
                name: "MODULE 2",
                chapters: [
                    { name: "Chapter 5: Activity Based Costing", pdfId: 5 },
                    { name: "Chapter 6: Cost Sheet", pdfId: 6 },
                    { name: "Chapter 7: Cost Accounting Systems", pdfId: 7 }
                ]
            },
            {
                name: "MODULE 3",
                chapters: [
                    { name: "Chapter 8: Unit and Batch Costing", pdfId: 8 },
                    { name: "Chapter 9: Job Costing", pdfId: 9 },
                    { name: "Chapter 10: Contract Costing", pdfId: 10 },
                    { name: "Chapter 11: Process Costing", pdfId: 11 },
                    { name: "Chapter 12: Joint Products and By-Products", pdfId: 12 },
                    { name: "Chapter 13: Service Costing", pdfId: 13 }
                ]
            },
            {
                name: "MODULE 4",
                chapters: [
                    { name: "Chapter 14: Standard Costing", pdfId: 14 },
                    { name: "Chapter 15: Marginal Costing", pdfId: 15 },
                    { name: "Chapter 16: Budget and Budgetary Control", pdfId: 16 }
                ]
            }
        ]
    },
    {
        id: "int-p5", title: "Auditing and Ethics", code: "Paper 5", color: "book-color-5",
        paperId: 9,
        modules: [
            {
                name: "MODULE 1",
                chapters: [
                    { name: "Chapter 1: Nature, Objective and Scope of Audit", pdfId: 1 },
                    { name: "Chapter 2: Audit Strategy, Planning and Programme", pdfId: 2 },
                    { name: "Chapter 3: Audit Documentation and Evidence", pdfId: 3 }
                ]
            },
            {
                name: "MODULE 2",
                chapters: [
                    { name: "Chapter 4: Risk Assessment and Internal Control", pdfId: 4 },
                    { name: "Chapter 5: Fraud and Auditor Responsibilities", pdfId: 5 },
                    { name: "Chapter 6: Audit in Automated Environment", pdfId: 6 }
                ]
            },
            {
                name: "MODULE 3",
                chapters: [
                    { name: "Chapter 7: Audit Sampling", pdfId: 7 },
                    { name: "Chapter 8: Analytical Procedures", pdfId: 8 },
                    { name: "Chapter 9: Audit of Items of Financial Statements", pdfId: 9 }
                ]
            },
            {
                name: "MODULE 4",
                chapters: [
                    { name: "Chapter 10: The Company Audit", pdfId: 10 },
                    { name: "Chapter 11: Audit Reports", pdfId: 11 },
                    { name: "Chapter 12: Ethics and the Auditor", pdfId: 12 }
                ]
            }
        ]
    },
    {
        id: "int-p6", title: "FM and Strategic Management", code: "Paper 6", color: "book-color-6",
        paperId: 10,
        modules: [
            {
                name: "SECTION A: Financial Management",
                isSection: true,
                chapters: [
                    { name: "Chapter 1: Scope and Objectives of Financial Management", pdfId: 1 },
                    { name: "Chapter 2: Types of Financing", pdfId: 2 },
                    { name: "Chapter 3: Cost of Capital", pdfId: 3 },
                    { name: "Chapter 4: Capital Structure", pdfId: 4 },
                    { name: "Chapter 5: Leverages", pdfId: 5 },
                    { name: "Chapter 6: Capital Budgeting", pdfId: 6 },
                    { name: "Chapter 7: Working Capital Management", pdfId: 7 },
                    { name: "Chapter 8: Dividend Decision", pdfId: 8 }
                ]
            },
            {
                name: "SECTION B: Strategic Management",
                isSection: true,
                chapters: [
                    { name: "Chapter 9: Introduction to Strategic Management", pdfId: 9 },
                    { name: "Chapter 10: Strategic Analysis - External", pdfId: 10 },
                    { name: "Chapter 11: Strategic Analysis - Internal", pdfId: 11 },
                    { name: "Chapter 12: Strategic Choices", pdfId: 12 },
                    { name: "Chapter 13: Strategy Implementation", pdfId: 13 },
                    { name: "Chapter 14: Strategic Evaluation and Control", pdfId: 14 }
                ]
            }
        ]
    }
];

// Consolidate all study materials
const studyMaterials = {
    foundation: foundationData,
    intermediate: intermediateData,
    final: [] // Will be loaded from separate file if needed
};

// =========================================
// EXAM PAPERS DATA (Last 5 Years)
// =========================================
const examPapers = {
    foundation: {
        mtp: [
            {
                year: "2025", attempts: [
                    { name: "May 2025 - Series I", url: "https://boslive.icai.org" },
                    { name: "May 2025 - Series II", url: "https://boslive.icai.org" },
                    { name: "Nov 2025 - Series I", url: "https://boslive.icai.org" },
                    { name: "Nov 2025 - Series II", url: "https://boslive.icai.org" }
                ]
            },
            {
                year: "2024", attempts: [
                    { name: "May 2024 - Series I", url: "https://boslive.icai.org" },
                    { name: "May 2024 - Series II", url: "https://boslive.icai.org" },
                    { name: "Nov 2024 - Series I", url: "https://boslive.icai.org" },
                    { name: "Nov 2024 - Series II", url: "https://boslive.icai.org" }
                ]
            },
            {
                year: "2023", attempts: [
                    { name: "May 2023", url: "https://boslive.icai.org" },
                    { name: "Nov 2023", url: "https://boslive.icai.org" }
                ]
            },
            {
                year: "2022", attempts: [
                    { name: "May 2022", url: "https://boslive.icai.org" },
                    { name: "Nov 2022", url: "https://boslive.icai.org" }
                ]
            },
            {
                year: "2021", attempts: [
                    { name: "May 2021", url: "https://boslive.icai.org" },
                    { name: "Nov 2021", url: "https://boslive.icai.org" }
                ]
            }
        ],
        rtp: [
            { year: "2025", attempts: [{ name: "May 2025 RTP", url: "https://boslive.icai.org" }, { name: "Nov 2025 RTP", url: "https://boslive.icai.org" }] },
            { year: "2024", attempts: [{ name: "May 2024 RTP", url: "https://boslive.icai.org" }, { name: "Nov 2024 RTP", url: "https://boslive.icai.org" }] },
            { year: "2023", attempts: [{ name: "May 2023 RTP", url: "https://boslive.icai.org" }, { name: "Nov 2023 RTP", url: "https://boslive.icai.org" }] },
            { year: "2022", attempts: [{ name: "May 2022 RTP", url: "https://boslive.icai.org" }, { name: "Nov 2022 RTP", url: "https://boslive.icai.org" }] },
            { year: "2021", attempts: [{ name: "May 2021 RTP", url: "https://boslive.icai.org" }, { name: "Nov 2021 RTP", url: "https://boslive.icai.org" }] }
        ],
        pastPapers: [
            { year: "2025", attempts: [{ name: "May 2025 Paper + Answers", url: "https://boslive.icai.org" }, { name: "Nov 2025 Paper + Answers", url: "https://boslive.icai.org" }] },
            { year: "2024", attempts: [{ name: "May 2024 Paper + Answers", url: "https://boslive.icai.org" }, { name: "Nov 2024 Paper + Answers", url: "https://boslive.icai.org" }] },
            { year: "2023", attempts: [{ name: "May 2023 Paper + Answers", url: "https://boslive.icai.org" }, { name: "Nov 2023 Paper + Answers", url: "https://boslive.icai.org" }] },
            { year: "2022", attempts: [{ name: "May 2022 Paper + Answers", url: "https://boslive.icai.org" }, { name: "Nov 2022 Paper + Answers", url: "https://boslive.icai.org" }] },
            { year: "2021", attempts: [{ name: "May 2021 Paper + Answers", url: "https://boslive.icai.org" }, { name: "Nov 2021 Paper + Answers", url: "https://boslive.icai.org" }] }
        ]
    },
    intermediate: { mtp: [], rtp: [], pastPapers: [] },
    final: { mtp: [], rtp: [], pastPapers: [] }
};

// Copy structure for intermediate and final
examPapers.intermediate = JSON.parse(JSON.stringify(examPapers.foundation));
examPapers.final = JSON.parse(JSON.stringify(examPapers.foundation));

// =========================================
// MAIN APPLICATION LOGIC
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    let currentTab = 'study-material';
    let currentLevel = 'foundation';

    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const levelRadios = document.querySelectorAll('input[name="level"]');
    const levelFilterDiv = document.getElementById('levelFilter');
    const materialShelf = document.getElementById('material-books');
    const paperShelf = document.getElementById('paper-books');
    const levelTitles = document.querySelectorAll('[data-level-title]');

    const chapterModal = document.getElementById('chapterModal');
    const modalClose = document.getElementById('modalClose');
    const modalSubjectTitle = document.getElementById('modalSubjectTitle');
    const modalLevelBadge = document.getElementById('modalLevelBadge');
    const chapterList = document.getElementById('chapterList');

    renderBooks();
    updateTitles();

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.dataset.tab;
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(currentTab).classList.add('active');
            levelFilterDiv.style.display = currentTab === 'notifications' ? 'none' : 'block';
            renderBooks();
        });
    });

    levelRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentLevel = e.target.value;
            renderBooks();
            updateTitles();
        });
    });

    modalClose.addEventListener('click', closeModal);
    chapterModal.addEventListener('click', (e) => { if (e.target === chapterModal) closeModal(); });

    function closeModal() {
        chapterModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderBooks() {
        if (currentTab === 'study-material') {
            const materials = studyMaterials[currentLevel] || [];
            materialShelf.innerHTML = materials.map(item => `
                <a href="#" class="book-card ${item.color}" data-subject-id="${item.id}">
                    <i class="fa-solid fa-book book-icon"></i>
                    <h3 class="book-title">${item.title}</h3>
                    <span class="book-tag">${item.code}</span>
                </a>
            `).join('');

            materialShelf.querySelectorAll('.book-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    openChapterModal(card.dataset.subjectId);
                });
            });
        }

        if (currentTab === 'papers') {
            paperShelf.innerHTML = `
                <div class="book-card book-color-5 paper-book" data-paper-type="mtp">
                    <i class="fa-solid fa-file-pen book-icon"></i>
                    <h3 class="book-title">Mock Test Papers (MTPs)</h3>
                    <span class="book-tag">2021-2025</span>
                </div>
                <div class="book-card book-color-6 paper-book" data-paper-type="rtp">
                    <i class="fa-solid fa-file-circle-check book-icon"></i>
                    <h3 class="book-title">Revision Test Papers (RTPs)</h3>
                    <span class="book-tag">2021-2025</span>
                </div>
                <div class="book-card book-color-1 paper-book" data-paper-type="past">
                    <i class="fa-solid fa-file-lines book-icon"></i>
                    <h3 class="book-title">Past Year Papers + Answers</h3>
                    <span class="book-tag">2021-2025</span>
                </div>
            `;

            document.querySelectorAll('.paper-book').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    openPaperModal(card.dataset.paperType);
                });
            });
        }
    }

    function openChapterModal(subjectId) {
        const materials = studyMaterials[currentLevel] || [];
        const subject = materials.find(s => s.id === subjectId);
        if (!subject) return;

        modalSubjectTitle.textContent = subject.title;
        modalLevelBadge.textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

        let html = '';
        subject.modules.forEach(mod => {
            const sectionClass = mod.isSection ? 'section-header' : '';
            html += `<div class="module-group">
                <h3 class="module-heading ${sectionClass}"><i class="fa-solid fa-folder"></i> ${mod.name}</h3>
                <div class="chapters-list">`;

            mod.chapters.forEach((ch, idx) => {
                if (ch.isChapterHeader && ch.units) {
                    html += `<div class="chapter-header-item"><i class="fa-solid fa-book-open"></i> ${ch.name}</div>`;
                    ch.units.forEach(unit => {
                        const directUrl = getDirectPdfUrl(subjectId, unit.pdfId);
                        const pdfUrl = directUrl || (PDF_CDN + `${currentLevel}-p${subject.paperId}-ch${unit.pdfId}.pdf`);
                        html += `<div class="chapter-item unit-item">
                            <div class="chapter-info"><span class="chapter-name">${unit.name}</span></div>
                            <button class="chapter-download-btn" onclick="downloadPDF('${pdfUrl}', '${unit.name.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-download"></i> Download
                            </button>
                        </div>`;
                    });
                } else {
                    const directUrl = getDirectPdfUrl(subjectId, ch.pdfId);
                    const pdfUrl = directUrl || (PDF_CDN + `${currentLevel}-p${subject.paperId}-ch${ch.pdfId}.pdf`);
                    html += `<div class="chapter-item">
                        <div class="chapter-info">
                            <span class="chapter-number">${idx + 1}</span>
                            <span class="chapter-name">${ch.name}</span>
                        </div>
                        <button class="chapter-download-btn" onclick="downloadPDF('${pdfUrl}', '${ch.name.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-download"></i> Download
                        </button>
                    </div>`;
                }
            });
            html += '</div></div>';
        });

        chapterList.innerHTML = html;
        chapterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openPaperModal(paperType) {
        const papers = examPapers[currentLevel];
        let title, data;

        if (paperType === 'mtp') { title = 'Mock Test Papers (MTPs)'; data = papers.mtp; }
        else if (paperType === 'rtp') { title = 'Revision Test Papers (RTPs)'; data = papers.rtp; }
        else { title = 'Past Year Papers with Answers'; data = papers.pastPapers; }

        modalSubjectTitle.textContent = title;
        modalLevelBadge.textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

        chapterList.innerHTML = data.map(yearData => `
            <div class="year-group">
                <h3 class="year-heading"><i class="fa-solid fa-calendar"></i> ${yearData.year}</h3>
                <div class="attempts-list">
                    ${yearData.attempts.map(att => `
                        <div class="chapter-item">
                            <div class="chapter-info"><span class="chapter-name">${att.name}</span></div>
                            <button class="chapter-download-btn" onclick="downloadPDF('${att.url}', '${att.name.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-download"></i> Download
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        chapterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateTitles() {
        const title = currentLevel === 'final' ? 'CA Final' :
            currentLevel === 'intermediate' ? 'CA Intermediate' : 'CA Foundation';
        levelTitles.forEach(t => t.textContent = title);
    }
});
