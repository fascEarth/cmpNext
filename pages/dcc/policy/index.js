// ** React Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';  
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';     
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';   
import CardMedia from '@mui/material/CardMedia'; 
import CardContent from '@mui/material/CardContent'; 
import CardActions from '@mui/material/CardActions'; 
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel'; 
import TabContext from '@mui/lab/TabContext'; 
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// ** MUI ICON Components

// ** Custom CSS 
import styles from './index.module.css';
import DccLayout from '../../../components/layouts/dcc/Layout';

function Policy() { 

    const router = useRouter();
    const { type } = router.query;
    console.log(router.query);
    

    // ** OverAll Tab Function
    const [PrivacyDetailValue, setPrivacyDetailValue] = useState('TermsofUse')
    const handlePrivacyDetailValue = (event, newPrivacyDetailValue) => {
        setPrivacyDetailValue(newPrivacyDetailValue)
    }

    useEffect(() => {
        if(type){
            if(type === "privacy"){
                setPrivacyDetailValue("PrivacyPolicy");
            }else if(type === "terms"){    
                setPrivacyDetailValue("TermsofUse");
            }else if(type === "cookie"){        
                setPrivacyDetailValue("CookiePolicy");
            }
        }
    },[type])

    return (
    <DccLayout>
        <Box sx={{margin: '0 16px'}} className={styles.PolicyWrapper}> {/* TR 01 class name*/}

            <Card sx={{mt:2, borderRadius:'7px', height: '65px'}}>
                <CardContent sx={{ padding: '0px !important'}}>
                    <TabContext value={PrivacyDetailValue} >
                        {/* Start Tab List Sekeleton */}
                        <Skeleton variant="text" animation="wave" width={'100%'} height={115} sx={{borderRadius: '12px', marginTop: '-25px', 
                        display:'none'}} />
                        {/* End Tab List Sekeleton */}
                        <TabList variant="fullWidth" onChange={handlePrivacyDetailValue} className={styles.tabContainer} aria-label='simple tabs 
                        example' TabIndicatorProps={{style: {height: '3px', backgroundImage: "linear-gradient(to right, #82c8e9, #11b4ff)"} }} 
                        sx={{"& .MuiTab-root.Mui-selected": {color: '#FFF', backgroundColor: 'transparent', fontWeight: '550', height: '65px' } }} >
                            <Tab value='PrivacyPolicy' label='Privacy Policy' className={styles.tabButton} />
                            <Tab value='TermsofUse' label='Terms of Use' className={styles.tabButton} />
                            <Tab value='CookiePolicy' label='Cookie Policy' className={styles.tabButton} />
                        </TabList>
                    </TabContext>
                </CardContent>
            </Card>

            <Card sx={{mt:2, mb:2, borderRadius:'7px', backgroundImage: 'linear-gradient(90deg, rgba(1,56,80,1) 0%, rgba(7,115,165,1) 50%) !important'}}>
                <CardContent sx={{ padding: '24px'}}>
                    <TabContext value={PrivacyDetailValue} >
                        <TabPanel value='PrivacyPolicy' sx={{p: 0}}>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            Updated 31/05/2022 </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                              This is the Privacy Policy of Detecon Al Saudia DETASAD Co. Ltd. and its wholly owned subsidiaries (collectively, 
                             “DETASAD,” “we,” “our,” or “us”), your privacy is important to us, and this Privacy Policy explains the personal data 
                              DETASAD processes,and for what purposes.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            1. What This Privacy Policy Covers</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                              This Privacy Policy thatIncludedon ******* (“Website”) and applies to DETASAD services andDETASAD’s practices for 
                              collecting personal information, when we act as controller or processer of personal information provided to DETASAD 
                              over the Internet by viewing or using the Website or that we otherwise collect from or about you. DETASAD will 
                              collect, store, and use personal information only in compliance with this Privacy Policy and applicable laws which are:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                A) Saudi Personal Data Protection Law and related regulations in Saudi Arabia for Saudi Citizens and Residents.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                B) European Union and European Economic Area and United Kingdom specific provisions relating to data subjects’ rights 
                                and legal bases which only apply to you if the GDPR or the UK GDPR applies to the processing of your personal data.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                C) Data Protection Laws and Regulations in USA for US Citizens and Residents.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2. What kind of Personal Information We Collect</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Information You Give Us: We collect any information you provide in relation to our Services;we collect personal 
                                information from you or that you provide to us when accessing our Website or otherwise,based on the nature of the 
                                transaction, the types of personal information that may be collected from you include the following:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                A) Contact Information: contact and identifying information (e.g., name, address, email address, phone and fax 
                                numbers, employer(s), job title(s) ) in connection with your expression of interest in receiving information about, 
                                or your registering forDETASAD services.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                B) Account Information: if you use the Website to open an account with DETASAD, we collect the information requested 
                                on our account application form. This information is used for internal purposes, such as account establishment, 
                                fulfilment of ordersfromcustomer and/or its clints.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                You are responsible for keeping confidential any passwords that we give you (or you choose) that enable you to 
                                access certain parts of our website. For security reasons, such passwords must not be shared with anyone.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                C) Other Information: other personal information not listed above that you may voluntarily be provided to us in an 
                                online form or through an email or other electronic means.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Automatic Information: We automatically collect certain types of information when you interact with our services. 
                                DETASAD’s Website may use technologies, such as cookies, scripts, and tags to analyze trends, to administer the 
                                Website, to track users’ movements around the Website and to gather demographic information about our user base.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                When you visit the Website, we may collect general Internet data, including your domain name, the web page from which 
                                you entered the Website, which pages you visited on the Website, and how much time you spend on each page. To 
                                collect this information, a “cookie” may be set on your computer whenever you visit the Website. A cookie is 
                                information sent by a web server to a web browser and stored by the browser. Each time the browser requests a page 
                                from the web server, the cookie communicates with the web server. This enables the web server to identify and track 
                                the web browser.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                Cookies contain information that allows our web servers to recognize your IP address whenever you visit the Website. 
                                We use cookies to record session information, passwords, and the profile of subscribed clients of the site in order 
                                to provide better service when visitors return to the Website. We use the information we collect to study how this 
                                Website is used, so that we may improve and enhance your experience on our Website. For example, we also may use 
                                information obtained from cookies to tailor how the website appears to you to better match your interests and 
                                preferences.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            3. How We Use Personal Information</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.1 Provide Services: We use your personal information to provide and deliver ourservices and process transactions 
                                related to our services, including registrations, subscriptions, purchases, and payments.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.2 Measure, Support, and Improve Services: We use your personal information to measure use of our performance, 
                                fixing errors and providing support, improving, and developingourservices.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.3 Recommendations and Personalization: We use your personal information to recommendservices that might be of 
                                interest to you, identify your preferences, and personalize your experience with our services.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.4 Comply with Legal Obligations: In certain cases, we have a legal obligation to collect, use, or retain your 
                                personal information. For example, bank account information.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.5 Communication with You: We use your personal information to communicate with you in relation to our services via 
                                different channels (e.g., by phone, email, chat) and to respond to your requests.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.6 Fraud and Abuse Prevention and Credit Risks: We use your personal information to prevent and detect fraud and 
                                abuse in order to protect the security of our customers, services, and others.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                3.7 Protection of Us and Others: We release account and other personal information when we believe release is 
                                appropriate to comply with the applicable law, enforce or apply our terms and other agreements, or protect the 
                                rights, property, or security of our services, our customers, or others. This includes exchanging information with 
                                other companies and organizations for fraud prevention and detection and credit risk reduction.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            4. How We Secure Information</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                At DETASAD, security is our highest priority, we put the following into consideration:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                A) We maintain physical, electronic, and procedural safeguards in connection with the collection, processing, 
                                storage, and disclosure of personal information.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                B) DETASAD is committed to protect the personal information itreceives about individuals. However, no method of 
                                transmission over the Internet, or method of electronic storage, is 100% secure. While we cannot guarantee the 
                                security of your personal information, we utilize a combination of online and offline security technologies, 
                                procedures and organizational measures in line with best practices to safeguard personal information against loss, 
                                misuse, and unauthorized access, disclosure, alteration and destruction.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            5. Purposes for Which We Use the Personal Data We Collect</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.1 To provide our products, services, events, websites, communities, training, certifications, and other services.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.2 For marketing, advertising, and other communications.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.3 To manage our relationships with customers, partners, suppliers, event attendees, and others reasons 
                                forinteracting with you and your clients.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.4 For surveys and other market research.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.5 For cybersecurity requirements.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.6 To analyze, improve, and create DETASADservices.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.7 To enforce the legal terms that govern our business and online properties.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.8 To provide security and business continuity.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                5.9 For other purposes requested or permitted by our customers or users, or as reasonably required to perform our 
                                business.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            6. Return of Information</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                DETASAD shall be entitled to process thepersonal informationas long as the services are provided and for a period as 
                                required by Saudi Laws and Regulations for private entities to retain any company records .
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            7. Changes to This Privacy Policy</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                DETASAD may revise or update this PrivacyPolicy on occasion to reflect changes to our practices. If we make any 
                                material changes to this Privacy Policy, we will provide notification of such changes’ effective date prior to the 
                                changes taking effect through our Website. DETASAD will not provide less privacy protection, without your consent, to 
                                information collected under a prior Privacy Policy. We encourage you to refer to this Privacy Policy for the latest 
                                information and the effective date of any changes.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            8. How to Contact Us</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                For exercising any of the rights mentioned above,and notifying us of any data breach, you can email us at(*******).
                            </Typography>
                            <Typography component="p" variant="p" align="left" color="#fff" fontSize={15} fontWeight={400}>
                                I acknowledge that DETASAD will process my personal data in accordance with this Privacy Policy.
                            </Typography>
                        </TabPanel>
                        <TabPanel value='TermsofUse' sx={{p: 0}}>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            Service Subscription Terms and Conditions by Detecon Al Saudia DETASAD Co. Ltd:</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                These Terms and Conditions are applicable for the Services to be provided by DETASAD andcustomer/user acknowledge and 
                                undertake to the following
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            1. Payment</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                A. Service will only start after receiving payment unless agreed differently.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                B. Invoicing Cycle: the subscription fees for the DETASD service and any other charges you may incur in connection 
                                with your use of the service, such as taxes and possible transaction fees, will be charged to your Payment Method on 
                                the specific payment date indicated on the &quot;****&quot; page. The length of your billing cycle will depend on the type of 
                                subscription that you choose when you signed-up for the service.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                C. “Payment Method” means a current, valid, accepted method of payment, as may be updated from time to time, and 
                                which may include payment through your account with a third party. Unless you cancel your membership before your 
                                billing date,and to use DETASAD services you must provide us with one or more Payment Methods. The following 
                                Payment methods are acceptable: Credit card ,DETASAD wallet , Bank transfer
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                D. No Refunds: PAYMENTS ARE NONREFUNDABLE AND THERE ARE NO REFUNDS OR CREDITS FOR PARTIALLY USED PERIODS. Following 
                                any cancellation, however, you will continue to have access to the service through the end of your current billing 
                                period. At any time, and for any reason, we may provide a refund, discount, or other consideration to our customers 
                                (&quot;credits&quot;). The amount and form of such credits, and the decision to provide them, are at DETASAD’s sole and 
                                absolute discretion. The provision of credits in one instance does not entitle you to credits in the future for 
                                similar instances, nor does it obligate us to provide credits in the future, under any circumstance.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2. Term and Termination</Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.1 Term</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                The Agreement begins on the Activation of the Services (“Effective Date”) and continuesuntil terminated
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.2 Termination for Cause</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                DETASAD may terminate this Agreement immediately, if there is any material default or breach of the Agreement by the 
                                other Party, unless the defaulting Party has cured the material default or breach within a fifteen (15) day notice 
                                period, without prejudice to any other right or remedy. If any breach is not cured to the satisfaction of the 
                                terminating Party, the provision of the Services shall immediately be deactivated.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                Upon termination of the Agreement all CUSTOMER’s rights and DETASAD’s obligations under the Agreement terminate as of 
                                the date when the termination becomes effective, and CUSTOMER remains responsible. For all fees incurred until the 
                                effective date of termination, and any CUSTOMER payment obligations will survive such termination.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.3 No Compensation and Indemnity</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                Unless stated otherwise in the Agreement with regard to the responsibilities, obligations and liabilities of the 
                                Parties, upon termination or expiration of this Agreement for any reason or at any time, neither Party will have any 
                                further obligations to the other Party or to any employee, agent, representative or CUSTOMER of the other Party, 
                                for compensation or for damages of any kind, whether on account of the loss by the other Party or such employee, 
                                agent, representative or CUSTOMER of present or prospective sales, investments, compensation or goodwill. Each 
                                Party hereby indemnifies and holds the other Party harmless from and against any and all claims, costs, damages 
                                and liabilities, except for any consequential damages, loss of actual or anticipated revenues or profits, loss 
                                of actual or possible CUSTOMERs, loss of medical treatment, loss of goodwill, whatsoever asserted by any 
                                employee, agent, representative or client/ end user of CUSTOMER under any applicable cancellation, 
                                termination, work, social security, payments under national insurance, or other laws or regulations.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.4 Suspension by DETASAD</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                DETASAD may suspend the Agreement in its entirety (thus, the right of CUSTOMER to use the Services or part of it will 
                                cease) for cause as set forth below:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                A) In order to comply with the law or requests of any governmental entity, law enforcement or judicial body.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                B) Content Violation.CUSTOMER shall not use, or encourage, promote, facilitate, or instruct others to use, the Cloud 
                                Services for any illegal, unlawful, infringing, harmful or offensive use, or to transmit, store, display, 
                                distribute, link or otherwise make available Content or Data that is illegal/unlawful, infringing, harmful, or 
                                offensive. Prohibited activities or Contents include, but are not limited to:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Any illegal activities as defined by the laws and regulations of the Kingdom of Saudi Arabia (including, but not 
                                limited to, the Anti-Cyber Crime Law) or the country of residence or operation of CUSTOMER or its clients / end 
                                users.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Any activities that may be harmful to DETASAD ora third party’s operations or reputation.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Distributing or linking Content that infringes or misappropriates the intellectual property or proprietary rights 
                                of DETASAD or any other third parties.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Uploading, downloading, displaying, posting, emailing, transmitting, storing, distributing, linking or otherwise 
                                making available any Content that is unlawful, harassing, threatening, harmful, tortious, defamatory, libelous, 
                                immoral, obscene, abusive, violent, invasive of privacy, hateful, racially, religiously or ethnically offensive, or 
                                otherwise objectionable, including Content that is not tolerated by the legislation of the Kingdom of Saudi Arabia 
                                (e.g. escort services), or the country of residence or operation of CUSTOMER or its clients / end users .
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Distributing Content or other computer or IT technology that may damage, interfere with, surreptitiously intercept, 
                                or expropriate any system, program, or data, including, but not limited to, viruses, Trojan horses, worms, time 
                                bombs, or cancelbots, corrupted files, Distributed Denial-of-Service (DDoS) attacks, or any other similar software, 
                                programs or activity that may damage the operation of DETASAD’s Services or a third party’s computer or property.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Forging any TCP-IP packet header or any part of the header information in an email or a newsgroup posting, or 
                                otherwise putting information in a header designed to mislead recipients as to the origin of any Content transmitted 
                                through DETASAD’s Services(‘spoofing’).
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Interfering with or disrupting DETASAD’s Services (including accessing DETASAD’s Services through any automated 
                                means, like scripts or web crawlers), or any servers or networks connected to DETASAD’s Services, or any policies, 
                                requirements or regulations of networks connected to DETASAD’s Services (including any unauthorized access to, use or 
                                monitoring of data or passage thereon).
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.5.1 Security Violation</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                CUSTOMER or its clients / end users shall not use DETASAD’s Services to violate the security or integrity of any 
                                network, computer or communications system, software application, or network or computing device (hereinafter 
                                “System”) or violate the Saudi Anti-Cyber Crime Law. Prohibited activities include, but are not limited to:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Accessing or using any System without permission, including attempting to probe, scan, or test the vulnerability of 
                                a System or to breach any security or authentication measures used by a System.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Monitoring of data or passage on a System without permission.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Forging TCP/IP (Transmission Control Protocol/Internet Protocol) packet headers, e-mail headers, or any part of a 
                                message describing its origin or route.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.5.2 Network Violation</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                CUSTOMER or its clients / end users shall not make network connections to any users, hosts, or networks unless 
                                CUSTOMER has permission to communicate with them. Prohibited activities include, but are not limited to:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Monitoring or tracking of a System that impairs or disrupts the System being monitored or tracked.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Flooding a target with communications requests so the target either cannot respond to legitimate passage or 
                                responds so slowly that it becomes ineffective.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Interfering with the proper functioning of any System, including any deliberate attempt to overload a system by 
                                mail bombing, news bombing, broadcast attacks, or flooding techniques.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Operating network services like open proxies, open mail relays, or open recursive domain name servers.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                • Using manual or electronic means to avoid any use limitations placed on a System, such as access and storage 
                                restrictions.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.5.3 Message Violation</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                                CUSTOMER, its clients / end users shall not (a) distribute, publish, send, or facilitate the sending of unsolicited 
                                mass e-mail or other messages, promotions, advertising, or solicitations (like ‘spam’), sending a fraudulent (e.g., 
                                spoofed, fake, or otherwise deceptive) message designed to trick a person into revealing sensitive information to the 
                                attacker or to deploy malicious software on the victim&apos;s infrastructure like ransomware ( “phishing&quot; ) ,(b) alter or 
                                obscure mail headers or assume a sender’s identity without the sender’s explicit permission; (c) collect replies to 
                                messages sent from another internet service provider if those messages violate this Policy or the acceptable use 
                                policy of that provider.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.5.4 Monitoring and Measures</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            DETASAD has no and will not assume any liability or responsibility whatsoever towards the CUSTOMER or its clients / end users or any other third party, if the CUSTOMER or its clients / end users violate, or misuse the Services or for any measures or actions DETASAD may take under this T&C.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            2.5. Unless otherwise stated in Applicable Laws DETASAD will:</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Not have any obligation to and will not actively and constantly monitor its systemsor servicesfor Unlawful Content or Infringing Content.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Not have or assume any right or obligation either on its own initiative or upon request of any third party to remove from or render inaccessible any Unlawful Content or Infringing Content on its System or services.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Have the right to remove or make inaccessible any Unlawful Content or Infringing Content from Systems or services thatare used or relied on by DETASAD for the provision of Services upon a written order by CITC or any other authorized entity in the Kingdom of Saudi Arabia.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Not have or assume any kind of liability whatsoever for any Unlawful Content or Infringing Content that has been uploaded, processed, or stored on its systems.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Inform any competent authority or any other authorized entity in the Kingdom of Saudi Arabia without undue delay, if it becomes aware of the presence of any CUSTOMER Content or other information on its System that may constitute a violation of the Saudi Anti Cyber Crime Law.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            • Refer any third parties complaining against Unlawful Content or Infringing Content on DETASADs’ Systems or services to the competent authorities in the Kingdom.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            DETASAD may investigate or monitor violations of this T&C or any Applicable Law of the Kingdom of Saudi Arabia or the country of residence of the CUSTOMER or misuse of the Services. If required by Applicable Law or requested by any competent governmental authority DETASAD will (a) provide CUSTOMER Technical Information; (b) cooperate with appropriate law enforcement agencies, regulators, or other competent governmental authorities to help with investigation and prosecution of illegal conduct by providing network and systems information related to alleged violations of any Applicable Law.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            3. Software, Intellectual Property</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            Both Parties agree that the Software regarding the Services is or contains proprietary and confidential information that is protected by applicable intellectual property and other laws, including but not limited to any copyrighttrademark trade name, service mark, slogan, logo or domain name, patent and any other international Intellectual Property Rights (“IPR”) laws and regulations, and both Parties agree to comply with all applicable IPRlaws and regulations regarding the Software and the licensing and usage conditions for the Software. In case any IPR is developed by DETASAD during the performance and within DETASAD’s scope of the Services, it shall solely belong to and owned by DETASAD.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            Neither DETASAD nor CUSTOMER will acquire any right, title, nor interest in the other Party’s IPR, or the goodwill associated with them. Neither DETASAD nor CUSTOMER will challenge the validity of the other Party’s IPR, nor assist anyone in challenging their validity. Neither DETASAD nor CUSTOMER shall make any application to register any other Party’s IPR or any domain names containing other Party’s Trademarks and intellectual property, and not to use or register any IPR, or domain name that is confusing with,similar to, or a reference to, any Party’s IPR and or Service during or after the Term of this Agreement. Neither DETASAD nor CUSTOMER shall disparage the other Party, or the other Party’s IPR or services.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            The CUSTOMER shall not be entitled to copy or simulate the Services. In case DETASAD discovers or detects any copying or simulation (electronically, automatically, manually, or otherwise) by the CUSTOMER, DETASAD may at its own sole discretion deactivate the Services immediately without assuming any liabilities.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            4. LIMITATIONS OF LIABILITY</Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            4.1 Disclaimer of Warranties</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            To the maximum extent permitted by applicable law, the Services are provided &quot;as is&quot; and without warranties or conditions of any kind, including implied warranties of merchantability, non-infringement, and fitness for a particular purpose. CUSTOMER shall not make any representations or warranties on behalf of DETASAD regarding the Services in connection with the use of the Services or otherwise.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            4.2 Exclusion of Liabilities</Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            Notwithstanding anything to the contrary contained in the Agreement or any order form, to the maximum extent permitted by Applicable Law, in no event will DETASAD or its Affiliates, subsidiaries, officers, directors, employees, agents, partners or licensors be liable to the CUSTOMER or its Affiliates or CUSTOMER’s Affiliates’, end users, suppliers or other parties for: any claim based upon a third party claim; any indirect, incidental, special, consequential, exemplary or punitive damages, anticipated or lost revenue or profits, whether arising in tort, contract, or otherwise; or for any damages arising out of or in connection with any malfunctions, delays, loss of data or content, lost business, lost contracts, lost goodwill, anticipated or lost savings, cost of procurement of substitute goods or services, or other intangible losses, reputation, or media, even if DETASAD or its Affiliates have been advised of the possibility of such damages.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            Furthermore, DETASAD or its Affiliates, subsidiaries, officers, directors, employees, agents, partners or licensors will not be responsible and liable for any compensation, reimbursement or damages arising in connection with:
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            A) The inability of the CUSTOMER, or its customers, or consumers or end users to use the Services (1) due to reasons not under DETASAD control or (2) due to reasons, actions, incidents, faults caused by or under CUSTOMER control.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            B) Any investments, expenditures, or commitments by the CUSTOMER in connection with this agreement or the use of or access to the service offered by the CUSTOMER.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            C) Any loss of connectivity to Services if not caused by DETASAD.
                            </Typography>
                            <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                            Without limiting the generality of the foregoing disclaimer, DETASAD Services are not specifically designed, produced, or intended for use in (1) the planning, construction, maintenance, control or direct operation of nuclear facilities, (2) aircraft navigation, control or communication systems, weapons or defense systems, or (3) direct life support systems. CUSTOMER agrees that he is solely responsible for the results obtained from the use of the DETASAD Services.
                            </Typography>
                            <Typography component="h4" variant="h5" align="left" mb={2} color="#b6f2ff" fontSize={20} fontWeight={400}>
                            4.3 Limitation of Liability</Typography>
                            <Typography component="p" variant="p" align="left" color="#fff" fontSize={15} fontWeight={400}>
                            DETASAD’s aggregate liability will be limited cumulatively for all claims to 50% of the amount paid by the CUSTOMER during the immediately preceding Service duration in which the event (or first in a series of connected events) giving rise to the claim, occurred. This limitation of liability also applies to any information security breach or information leakage or cybersecurity incidents, if the CUSTOMER has opted for an “own coverage” solution, or if the CUSTOMER has declined a redundancy or other solution as offered by DETASAD to reduce any information security or cybersecurity risk. Any compensation entitlement of the CUSTOMER will always be compensated with service credits to the CUSTOMER and not in cash.
                            </Typography>
                        </TabPanel>
                        <TabPanel value='CookiePolicy' sx={{p: 0}}>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        Cookies are small text files that can be used by websites to make a user&apos;s experience more efficient.
                        </Typography>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission.
                        </Typography>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.
                        </Typography>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        You can at any time change or withdraw your consent from the Cookie Declaration on our website.
                        </Typography>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        Learn more about who we are, how you can contact us and how we process personal data in our Privacy Policy.
                        </Typography>
                        <Typography component="p" variant="p" align="left" mb={2} color="#fff" fontSize={15} fontWeight={400}>
                        Please state your consent ID and date when you contact us regarding your consent.
                        </Typography>
                        </TabPanel>
                    </TabContext>
                </CardContent>    
            </Card>    

        </Box>    

        </DccLayout>
    );
};

export default Policy;