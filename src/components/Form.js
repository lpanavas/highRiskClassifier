import React, { useState } from "react";
import axios from "axios";
import openai from "openai";
import "../styles/Form.css";
import loadingGif from "../images/loading-gif.gif";
const { Configuration, OpenAIApi } = require("openai");

function Form() {
  const [domain, setDomain] = useState("");
  const [purpose, setPurpose] = useState("");
  const [aiCapability, setAiCapability] = useState("");
  const [aiUser, setAiUser] = useState("");
  const [aiSubject, setAiSubject] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false); // Add this line

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    setOutput(null);

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an experienced judge that works in the field of AI regulation. You are thoughtful and decisive. You have access to the entirety of the EU AI Act, which outlines how various AI technologies are to be regulated and risk-classified within the European Union.",
        },
        {
          role: "user",
          content: `
    
                The relevant portions of the Act for what is unacceptable: 
                5.2.2. PROHIBITED ARTIFICIAL INTELLIGENCE PRACTICES (TITLE II)
    Title II establishes a list of prohibited AI. The regulation follows a risk-based approach,
    differentiating between uses of AI that create (i) an unacceptable risk, (ii) a high risk, and (iii)
    low or minimal risk. The list of prohibited practices in Title II comprises all those AI systems
    whose use is considered unacceptable as contravening Union values, for instance by violating
    fundamental rights. The prohibitions covers practices that have a significant potential to
    manipulate persons through subliminal techniques beyond their consciousness or exploit vulnerabilities of specific vulnerable groups such as children or persons with disabilities in
    order to materially distort their behaviour in a manner that is likely to cause them or another
    person psychological or physical harm. Other manipulative or exploitative practices affecting
    adults that might be facilitated by AI systems could be covered by the existing data
    protection, consumer protection and digital service legislation that guarantee that natural
    persons are properly informed and have free choice not to be subject to profiling or other
    practices that might affect their behaviour. The proposal also prohibits AI-based social
    scoring for general purposes done by public authorities. Finally, the use of ‘real time’ remote
    biometric identification systems in publicly accessible spaces for the purpose of law
    enforcement is also prohibited unless certain limited exceptions apply.
    
            PROHIBITED ARTIFICIAL INTELLIGENCE PRACTICES
    Article 5
    1. The following artificial intelligence practices shall be prohibited:
    (a) the placing on the market, putting into service or use of an AI system that
    deploys subliminal techniques beyond a person’s consciousness in order to
    materially distort a person’s behaviour in a manner that causes or is likely to
    cause that person or another person physical or psychological harm;
    (b) the placing on the market, putting into service or use of an AI system that
    exploits any of the vulnerabilities of a specific group of persons due to their
    age, physical or mental disability, in order to materially distort the behaviour of
    a person pertaining to that group in a manner that causes or is likely to cause
    that person or another person physical or psychological harm;
    (c) the placing on the market, putting into service or use of AI systems by public
    authorities or on their behalf for the evaluation or classification of the
    trustworthiness of natural persons over a certain period of time based on their
    social behaviour or known or predicted personal or personality characteristics,
    with the social score leading to either or both of the following:
    (i) detrimental or unfavourable treatment of certain natural persons or whole
    groups thereof in social contexts which are unrelated to the contexts in
    which the data was originally generated or collected;
    (ii) detrimental or unfavourable treatment of certain natural persons or whole
    groups thereof that is unjustified or disproportionate to their social
    behaviour or its gravity;
    (d) the use of ‘real-time’ remote biometric identification systems in publicly
    accessible spaces for the purpose of law enforcement, unless and in as far as
    such use is strictly necessary for one of the following objectives:
     the targeted search for specific potential victims of crime, including
    missing children;
    (ii) the prevention of a specific, substantial and imminent threat to the life or
    physical safety of natural persons or of a terrorist attack;
    (iii) the detection, localisation, identification or prosecution of a perpetrator
    or suspect of a criminal offence referred to in Article 2(2) of Council
    Framework Decision 2002/584/JHA62 and punishable in the Member
    State concerned by a custodial sentence or a detention order for a
    maximum period of at least three years, as determined by the law of that
    Member State.
    2. The use of ‘real-time’ remote biometric identification systems in publicly accessible
    spaces for the purpose of law enforcement for any of the objectives referred to in
    paragraph 1 point d) shall take into account the following elements:
    (a) the nature of the situation giving rise to the possible use, in particular the
    seriousness, probability and scale of the harm caused in the absence of the use
    of the system;
    (b) the consequences of the use of the system for the rights and freedoms of all
    persons concerned, in particular the seriousness, probability and scale of those
    consequences.
    In addition, the use of ‘real-time’ remote biometric identification systems in publicly
    accessible spaces for the purpose of law enforcement for any of the objectives
    referred to in paragraph 1 point d) shall comply with necessary and proportionate
    safeguards and conditions in relation to the use, in particular as regards the temporal,
    geographic and personal limitations.
    3. As regards paragraphs 1, point (d) and 2, each individual use for the purpose of law
    enforcement of a ‘real-time’ remote biometric identification system in publicly
    accessible spaces shall be subject to a prior authorisation granted by a judicial
    authority or by an independent administrative authority of the Member State in
    which the use is to take place, issued upon a reasoned request and in accordance with
    the detailed rules of national law referred to in paragraph 4. However, in a duly
    justified situation of urgency, the use of the system may be commenced without an
    authorisation and the authorisation may be requested only during or after the use.
    The competent judicial or administrative authority shall only grant the authorisation
    where it is satisfied, based on objective evidence or clear indications presented to it,
    that the use of the ‘real-time’ remote biometric identification system at issue is
    necessary for and proportionate to achieving one of the objectives specified in
    paragraph 1, point (d), as identified in the request. In deciding on the request, the
    competent judicial or administrative authority shall take into account the elements
    referred to in paragraph 2.
    4. A Member State may decide to provide for the possibility to fully or partially
    authorise the use of ‘real-time’ remote biometric identification systems in publicly
    accessible spaces for the purpose of law enforcement within the limits and under the conditions listed in paragraphs 1, point (d), 2 and 3. That Member State shall lay
    down in its national law the necessary detailed rules for the request, issuance and
    exercise of, as well as supervision relating to, the authorisations referred to in
    paragraph 3. Those rules shall also specify in respect of which of the objectives listed
    in paragraph 1, point (d), including which of the criminal offences referred to in
    point (iii) thereof, the competent authorities may be authorised to use those systems
    for the purpose of law enforcement.
    
                The relevant portions of the Act for what is High risk:
                
    5.2.3. HIGH-RISK AI SYSTEMS (TITLE III)
    Title III contains specific rules for AI systems that create a high risk to the health and safety
    or fundamental rights of natural persons. In line with a risk-based approach, those high-risk
    AI systems are permitted on the European market subject to compliance with certain
    mandatory requirements and an ex-ante conformity assessment. The classification of an AI
    system as high-risk is based on the intended purpose of the AI system, in line with existing
    product safety legislation. Therefore, the classification as high-risk does not only depend on
    the function performed by the AI system, but also on the specific purpose and modalities for
    which that system is used.
    Chapter 1 of Title III sets the classification rules and identifies two main categories of highrisk AI systems:
     AI systems intended to be used as safety component of products that are subject to
    third party ex-ante conformity assessment;
     other stand-alone AI systems with mainly fundamental rights implications that are
    explicitly listed in Annex III.
    This list of high-risk AI systems in Annex III contains a limited number of AI systems whose
    risks have already materialised or are likely to materialise in the near future. To ensure that
    the regulation can be adjusted to emerging uses and applications of AI, the Commission may
    expand the list of high-risk AI systems used within certain pre-defined areas, by applying a
    set of criteria and risk assessment methodology. 
    
            
            CLASSIFICATION OF AI SYSTEMS AS HIGH-RISK
    Article 6
    Classification rules for high-risk AI systems
    1. Irrespective of whether an AI system is placed on the market or put into service
    independently from the products referred to in points (a) and (b), that AI system shall
    be considered high-risk where both of the following conditions are fulfilled:
    (a) the AI system is intended to be used as a safety component of a product, or is
    itself a product, covered by the Union harmonisation legislation listed in Annex
    II;
    (b) the product whose safety component is the AI system, or the AI system itself as
    a product, is required to undergo a third-party conformity assessment with a
    view to the placing on the market or putting into service of that product
    pursuant to the Union harmonisation legislation listed in Annex II.
    2. In addition to the high-risk AI systems referred to in paragraph 1, AI systems
    referred to in Annex III shall also be considered high-risk.
    When assessing for the purposes of paragraph 1 whether an AI system poses a risk of
    harm to the health and safety or a risk of adverse impact on fundamental rights that is
    equivalent to or greater than the risk of harm posed by the high-risk AI systems already referred to in Annex III, the Commission shall take into account the
    following criteria:
    (a) the intended purpose of the AI system;
    (b) the extent to which an AI system has been used or is likely to be used;
    (c) the extent to which the use of an AI system has already caused harm to the
    health and safety or adverse impact on the fundamental rights or has given rise
    to significant concerns in relation to the materialisation of such harm or
    adverse impact, as demonstrated by reports or documented allegations
    submitted to national competent authorities;
    (d) the potential extent of such harm or such adverse impact, in particular in terms
    of its intensity and its ability to affect a plurality of persons;
    (e) the extent to which potentially harmed or adversely impacted persons are
    dependent on the outcome produced with an AI system, in particular because
    for practical or legal reasons it is not reasonably possible to opt-out from that
    outcome;
    (f) the extent to which potentially harmed or adversely impacted persons are in a
    vulnerable position in relation to the user of an AI system, in particular due to
    an imbalance of power, knowledge, economic or social circumstances, or age;
    (g) the extent to which the outcome produced with an AI system is easily
    reversible, whereby outcomes having an impact on the health or safety of
    persons shall not be considered as easily reversible;
    (h) the extent to which existing Union legislation provides for:
    (i) effective measures of redress in relation to the risks posed by an AI
    system, with the exclusion of claims for damages;
    (ii) effective measures to prevent or substantially minimise those risks.
    
            
            HIGH-RISK AI SYSTEMS REFERRED TO IN ARTICLE 6(2)
    High-risk AI systems pursuant to Article 6(2) are the AI systems listed in any of the following
    areas:
    1. Biometric identification and categorisation of natural persons:
    (a) AI systems intended to be used for the ‘real-time’ and ‘post’ remote biometric
    identification of natural persons;
    2. Management and operation of critical infrastructure:
    (a) AI systems intended to be used as safety components in the management and
    operation of road traffic and the supply of water, gas, heating and electricity.
    3. Education and vocational training:
    (a) AI systems intended to be used for the purpose of determining access or
    assigning natural persons to educational and vocational training institutions;
    (b) AI systems intended to be used for the purpose of assessing students in
    educational and vocational training institutions and for assessing participants in
    tests commonly required for admission to educational institutions.
    4. Employment, workers management and access to self-employment:
    (a) AI systems intended to be used for recruitment or selection of natural persons,
    notably for advertising vacancies, screening or filtering applications, evaluating
    candidates in the course of interviews or tests;
    (b) AI intended to be used for making decisions on promotion and termination of
    work-related contractual relationships, for task allocation and for monitoring
    and evaluating performance and behavior of persons in such relationships.
    5. Access to and enjoyment of essential private services and public services and
    benefits:
    (a) AI systems intended to be used by public authorities or on behalf of public
    authorities to evaluate the eligibility of natural persons for public assistance
    benefits and services, as well as to grant, reduce, revoke, or reclaim such
    benefits and services;
    (b) AI systems intended to be used to evaluate the creditworthiness of natural
    persons or establish their credit score, with the exception of AI systems put into
    service by small scale providers for their own use;
    (c) AI systems intended to be used to dispatch, or to establish priority in the
    dispatching of emergency first response services, including by firefighters and
    medical aid.
    6. Law enforcement:
    (a) AI systems intended to be used by law enforcement authorities for making
    individual risk assessments of natural persons in order to assess the risk of a
    natural person for offending or reoffending or the risk for potential victims of
    criminal offences;
    (b) AI systems intended to be used by law enforcement authorities as polygraphs
    and similar tools or to detect the emotional state of a natural person;
    EN 5 EN
    (c) AI systems intended to be used by law enforcement authorities to detect deep
    fakes as referred to in article 52(3);
    (d) AI systems intended to be used by law enforcement authorities for evaluation
    of the reliability of evidence in the course of investigation or prosecution of
    criminal offences;
    (e) AI systems intended to be used by law enforcement authorities for predicting
    the occurrence or reoccurrence of an actual or potential criminal offence
    based on profiling of natural persons as referred to in Article 3(4) of Directive
    (EU) 2016/680 or assessing personality traits and characteristics or past
    criminal behaviour of natural persons or groups;
    (f) AI systems intended to be used by law enforcement authorities for profiling of
    natural persons as referred to in Article 3(4) of Directive (EU) 2016/680 in the
    course of detection, investigation or prosecution of criminal offences;
    (g) AI systems intended to be used for crime analytics regarding natural persons,
    allowing law enforcement authorities to search complex related and unrelated
    large data sets available in different data sources or in different data formats in
    order to identify unknown patterns or discover hidden relationships in the data.
    7. Migration, asylum and border control management:
    (a) AI systems intended to be used by competent public authorities as polygraphs
    and similar tools or to detect the emotional state of a natural person;
    (b) AI systems intended to be used by competent public authorities to assess a risk,
    including a security risk, a risk of irregular immigration, or a health risk, posed
    by a natural person who intends to enter or has entered into the territory of a
    Member State;
    (c) AI systems intended to be used by competent public authorities for the
    verification of the authenticity of travel documents and supporting
    documentation of natural persons and detect non-authentic documents by
    checking their security features;
    (d) AI systems intended to assist competent public authorities for the examination
    of applications for asylum, visa and residence permits and associated
    complaints with regard to the eligibility of the natural persons applying for a
    status.
    8. Administration of justice and democratic processes:
    (a) AI systems intended to assist a judicial authority in researching and
    interpreting facts and the law and in applying the law to a concrete set of facts.
    
            
        Here are important definitions:
    
            ‘biometric data’ means personal data resulting from specific technical processing
    relating to the physical, physiological or behavioural characteristics of a natural
    person, which allow or confirm the unique identification of that natural person, such
    as facial images or dactyloscopic data;
    (34) ‘emotion recognition system’ means an AI system for the purpose of identifying or
    inferring emotions or intentions of natural persons on the basis of their biometric
    data;
    (35) ‘biometric categorisation system’ means an AI system for the purpose of assigning
    natural persons to specific categories, such as sex, age, hair colour, eye colour,
    tattoos, ethnic origin or sexual or political orientation, on the basis of their biometric
    data;
    (36) ‘remote biometric identification system’ means an AI system for the purpose of
    identifying natural persons at a distance through the comparison of a person’s
    biometric data with the biometric data contained in a reference database, and without
    prior knowledge of the user of the AI system whether the person will be present and
    can be identified ;
    (37) ‘‘real-time’ remote biometric identification system’ means a remote biometric
    identification system whereby the capturing of biometric data, the comparison and
    the identification all occur without a significant delay. This comprises not only
    instant identification, but also limited short delays in order to avoid circumvention.
    (38) ‘‘post’ remote biometric identification system’ means a remote biometric
    identification system other than a ‘real-time’ remote biometric identification system;
    (39) ‘publicly accessible space’ means any physical place accessible to the public,
    regardless of whether certain conditions for access may apply;
    (40) ‘law enforcement authority’ means:
    (a) any public authority competent for the prevention, investigation, detection or
    prosecution of criminal offences or the execution of criminal penalties,
    including the safeguarding against and the prevention of threats to public
    security; or
    (b) any other body or entity entrusted by Member State law to exercise public
    authority and public powers for the purposes of the prevention, investigation,
    detection or prosecution of criminal offences or the execution of criminal
    penalties, including the safeguarding against and the prevention of threats to
    public security;
    (41) ‘law enforcement’ means activities carried out by law enforcement authorities for the
    prevention, investigation, detection or prosecution of criminal offences or the
    execution of criminal penalties, including the safeguarding against and the
    prevention of threats to public security;
    (42) ‘national supervisory authority’ means the authority to which a Member State assigns
    the responsibility for the implementation and application of this Regulation, for
    coordinating the activities entrusted to that Member State, for acting as the single
    contact point for the Commission, and for representing the Member State at the
    European Artificial Intelligence Board;
    EN 43 EN
    (43) ‘national competent authority’ means the national supervisory authority, the
    notifying authority and the market surveillance authority;
    (44) ‘serious incident’ means any incident that directly or indirectly leads, might have led
    or might lead to any of the following:
    (a) the death of a person or serious damage to a person’s health, to property or the
    environment,
    (b) a serious and irreversible disruption of the management and operation of
    critical infrastructure.
    
    
         Now, I want you to classify the following AI technology using a three-tier classification: Unacceptable Risk, High Risk, and Not Classified as High Risk or Unacceptable Risk. Follow these steps:
    
                1. First, right a brief description of teh AI system. It should have a similar language to the EU AI act language. It should always follow the form "AI systems intended to be used ..." and never be more than two sentenes.
                2. First, determine whether the AI technology is of Unacceptable Risk. If it is, provide the exact text from the Act and explain how you arrived at this conclusion.
                3. If it's not of Unacceptable Risk, determine whether it's High Risk. Again, refer to the exact text from the Act and explain your reasoning.
                4. If it's neither High Risk nor Unacceptable Risk, then it must be classified as Not Classified as High Risk or Unacceptable Risk.
    
                Here is the AI technology:
    
             "Domain: ${domain}",
         "Purpose: ${purpose}",
         "Capability: ${aiCapability}",
         "AI User: ${aiUser}",
         "AI subject: ${aiSubject}"
    
    
     please return this information in a json format. Do not add any headings. only use the following keys. No additional headings!!!.
                { Description: "AI systems intended to be used ..."
                 Classification: [Unacceptable Risk/High Risk/Not Classified as High Risk or Unacceptable Risk]
                 Relevant Text from the Act: [Quotation if applicable]
                 Reasoning: [Explanation]
            }
                `,
        },
      ],
      max_tokens: 2000,
      temperature: 0,
    });

    setOutput(response.data.choices[0].message.content);
    setLoading(false); // Set loading to false when the request completes
  };

  function renderData(data, parentKey = "") {
    return Object.entries(data).map(([key, value]) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        return renderData(value, newKey);
      } else {
        return (
          <div key={newKey}>
            <h3>{newKey}</h3>
            <p>{value}</p>
          </div>
        );
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Please fill out this form to check what risk categorization your AI
        system falls under for the EU AI Act.
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Domain:
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </label>
        <label>
          Purpose:
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </label>
        <label>
          AI Capability:
          <input
            type="text"
            value={aiCapability}
            onChange={(e) => setAiCapability(e.target.value)}
            required
          />
        </label>
        <label>
          AI User:
          <input
            type="text"
            value={aiUser}
            onChange={(e) => setAiUser(e.target.value)}
            required
          />
        </label>
        <label>
          AI Subject:
          <input
            type="text"
            value={aiSubject}
            onChange={(e) => setAiSubject(e.target.value)}
            required
          />
        </label>
        {domain && purpose && aiCapability && aiUser && aiSubject ? (
          <input type="submit" value="Submit" />
        ) : (
          <p>Please fill all fields before submitting.</p>
        )}
      </form>
      {loading && <img src={loadingGif} alt="loading..." />}
      {output && (
        <div className="output">
          <h2>Output:</h2>
          {renderData(JSON.parse(output))}
        </div>
      )}
    </div>
  );
}

export default Form;
