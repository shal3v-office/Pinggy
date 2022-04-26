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
                metrics: {},
                overall_category: String,
                initial_url: String,
                origin_fallback: Boolean
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
                    initial_url: String,
                    origin_fallback: Boolean
                },  
            },
            lighthouseResult: {
                requestedUrl: String,
                finalUrl: String,
                lighthouseVersion: String,
                userAgent: String,
                fetchTime: String,
                userAgent: String,
                environment: {
                    networkUserAgent: String,
                    hostUserAgent: String,
                    benchmarkIndex: Number
                },
                runWarnings: [],
                configSettings: {
                    emulatedFormFactor: String,
                    locale: String,
                    onlyCategories: [],
                    channel: String,
                    formFactor: String
                },
                audits: {},
                categories: {},
                categoryGroups: {},
                timing: {
                    total:Number
                },
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
                stackPacks: {
                    id:String,
                    title:String,
                    iconDataURL: String,
                    descriptions: {}
                },
                runtimeError: {
                    code: String,
                    message: String
                }
            },
            analysisUTCTimestamp:String,
            version: {
                major: String,
                minor: String
            }
        }
    })
);
module.exports = { MonitorSpeed };

