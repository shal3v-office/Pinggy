const mongoose = require("mongoose");
const { Site } = require('./siteModel');

const MonitorSpeed = mongoose.model(
    "MonitorSpeed",
    new mongoose.Schema({
        link:String,
        siteId: {type: mongoose.Schema.Types.ObjectId, ref: Site},
        timestamps: {
            createdAt: Date
        },
        gpsiResult: {
            captchaResult: String,
            kind: String,
            id: String,
            loadingExperience: {
                id: String,
                metrics: {
                    FIRST_CONTENTFUL_PAINT_MS: {
                        percentile: Number,
                        distributions: [ 
                        {
                            min: Number,
                            max: Number,
                            proportion: Number
                        }],
                        category: String
                    },
                    FIRST_INPUT_DELAY_MS: {
                        percentile: Number,
                        distributions: [
                        {
                            min: Number,
                            max: Number,
                            proportion: Number
                        }],
                        category: String
                    }
                },
                overall_category: String,
                initial_url: String
            },
            originLoadingExperience: {
                id: String,
                metrics: {
                    FIRST_CONTENTFUL_PAINT_MS: {
                        percentile: Number,
                        distributions: [
                        {
                            min: Number,
                            max: Number,
                            proportion: Number
                        }],
                        category: String
                    },
                    FIRST_INPUT_DELAY_MS: {
                        percentile: Number,
                        distributions: [
                        {
                            min: Number,
                            max: Number,
                            proportion: Number
                        }],
                        category: String
                    },
                    overall_category: String,
                    initial_url: String
                },  
            },
            lighthouseResult: {
                requestedUrl: String,
                finalUrl: String,
                lighthouseVersion: String,
                userAgent: String,
                fetchTime: Date,
                environment: {
                    networkUserAgent: String,
                    hostUserAgent: String,
                    benchmarkIndex: Number
                },
                runWarnings: [],
                configSettings: {
                    emulatedFormFactor: String,
                    locale: String,
                    onlyCategories: [String]
                },
                audits: { },
                categories: {
                    performance: {
                        id: String,
                        title: String,
                        score: Number,
                        auditRefs: [
                        {
                            id: String,
                            weight: Number,
                            group: String
                        }]
                    }
                },
                categoryGroups: {},
                timing: {},
                i18n: {
                    rendererFormattedStrings: {
                        varianceDisclaimer: String,
                        opportunityResourceColumnLabel: String,
                        opportunitySavingsColumnLabel: String,
                        errorMissingAuditInfo: String,
                        errorLabel: String,
                        warningHeader: String,
                        auditGroupExpandTooltip: String,
                        passedAuditsGroupTitle: String,
                        notApplicableAuditsGroupTitle: String,
                        manualAuditsGroupTitle: String,
                        toplevelWarningsMessage: String,
                        scorescaleLabel: String,
                        crcLongestDurationLabel: String,
                        crcInitialNavigation: String,
                        lsPerformanceCategoryDescription: String,
                        labDataTitle: String,
                    }
                },
                stackPacks: {}
            },
            analysisUTCTimestamp:Date
        }
    })
);
module.exports = { MonitorSpeed };

