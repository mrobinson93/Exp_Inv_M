// Initialize jsPsych timeline
const timeline = [];

// Single-page survey with all questions formatted
const surveyQuestions = {
    type: 'survey-html-form',
    html: `
        <div style="margin-bottom: 20px;">
            <h3>Demographic Information</h3>
            <label for="age">What is your age? (Please enter your age below)</label>
            <input type="text" name="age" id="age" placeholder="e.g., 25" style="margin-bottom: 10px; width: 100%; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
            
            <div style="margin-top: 10px;">
                <label for="gender">What is your gender?</label>
                <select name="gender" id="gender" style="width: 100%; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <option value="">-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                </select>
            </div>

            <div style="margin-top: 10px;">
                <label>Are you studying, or have you previously studied finance at university?</label>
                <label><input type="radio" name="finance_study" value="Yes"> Yes</label>
                <label><input type="radio" name="finance_study" value="No"> No</label>
            </div>

            <div style="margin-top: 10px;">
                <label>Are you employed or have you previously been employed professionally in a financial position?</label>
                <label><input type="radio" name="financial_employment" value="Yes"> Yes</label>
                <label><input type="radio" name="financial_employment" value="No"> No</label>
            </div>

            <div style="margin-top: 10px;">
                <label>On average, roughly how much time in hours do you spend browsing social media? (e.g., TikTok, Instagram, etc.)</label>
                <input type="text" name="social_media_hours" placeholder="e.g., 2 hours" style="width: 100%; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
            </div>

            <div style="margin-top: 10px;">
                <label>Do you ever see content on social media that encourages you to invest or gives you advice on what to invest in?</label>
                <label><input type="radio" name="investment_content" value="Never"> Never</label>
                <label><input type="radio" name="investment_content" value="Sometimes"> Sometimes</label>
                <label><input type="radio" name="investment_content" value="Often"> Often</label>
                <label><input type="radio" name="investment_content" value="Very Often"> Very Often</label>
            </div>

            <div style="margin-top: 10px;">
                <label>Have you ever invested money in stocks or through trading using a personal app (e.g., Robinhood, Revolut, eToro)?</label>
                <label><input type="radio" name="invested_stocks" value="Yes"> Yes</label>
                <label><input type="radio" name="invested_stocks" value="No"> No</label>
            </div>

            <div style="margin-top: 10px;">
                <label>Would you ever consider investing money or trading using a personal app?</label>
                <label><input type="radio" name="consider_investing" value="Yes"> Yes</label>
                <label><input type="radio" name="consider_investing" value="No"> No</label>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h3>5-Point Likert Scale Questions (1 = Least Accurate, 5 = Most Accurate)</h3>
            ${createLikertSection([
                "I would never go hang-gliding or bungee jumping.",
                "I would stick to the rules.",
                "I would avoid dangerous situations.",
                "I rarely purchase the latest fashion styles until I am sure my friends approve of them.",
                "It is important that others like the products and brands I buy.",
                "When buying products, I generally purchase those brands that I think others will approve of.",
                "If other people can see me using a product, I often purchase the brand they expect me to buy.",
                "I like to know what brands and products make good impressions on others.",
                "I achieve a sense of belonging by purchasing the same products and brands that others purchase.",
                "If I want to be like someone, I often try to buy the same brands that they buy.",
                "I often identify with other people by purchasing the same products and brands they purchase.",
                "To make sure I buy the right product or brand, I often observe what others are buying and using.",
                "If I have little experience with a product, I often ask my friends about the product.",
                "I often consult other people to help choose the best alternative available from a product class.",
                "I frequently gather information from friends or family about a product before I buy."
            ], 5)}
        </div>

        <div style="margin-bottom: 20px;">
            <h3>7-Point Likert Scale Questions (1 = Strongly Disagree, 7 = Strongly Agree)</h3>
            ${createLikertSection([
                "When making a decision, I think much more about what might be lost than what might be gained.",
                "The pain of losing money matters more than the pleasure of gaining the same amount of money.",
                "I feel nervous when I have to make a decision that may lead to loss.",
                "The pain from losing something matters much more to me than the pleasure from getting it.",
                "Avoiding failure is less important to me than seeking success.",
                "Experiencing a major loss stays in my mind longer than experiencing a major gain.",
                "A potential failure scares me more than a potential success encourages me.",
                "The suffering that comes with losses can be fully offset by the pleasure that comes from gains."
            ], 7)}
        </div>

        <div style="margin-bottom: 20px;">
            <h3>Confidence Rating Questions</h3>
            <p>Please select one answer for each question and indicate your confidence as 33%, 66%, or 100%.</p>
            ${createConfidenceQuestion("How is an instant camera also called?", ["Canon camera", "Polaroid camera", "Minolta camera"], "camera_confidence")}
            ${createConfidenceQuestion("Where are flounders mainly to be found?", ["In coral reefs", "At the bottom of the sea", "In common reed"], "flounder_confidence")}
            ${createConfidenceQuestion("Which sauce is traditionally served with Thanksgiving turkey in the USA?", ["Blueberry sauce", "Red currant sauce", "Cranberry sauce"], "thanksgiving_sauce")}
            ${createConfidenceQuestion("Where does the Nobel Prize winner in Literature, Gabriel Garcia Marquez, come from?", ["Colombia", "Spain", "Venezuela"], "garcia_marquez_origin")}
            ${createConfidenceQuestion("What artistic movement does Anacreontics belong to?", ["Rococo", "Romanticism", "Realism"], "anacreontics_movement")}
        </div>
    `,
    button_label: "Submit"
};

// Helper function to generate Likert scale section
function createLikertSection(prompts, scale) {
    return prompts.map(prompt => `
        <div style="margin-top: 10px;">
            <label>${prompt}</label><br>
            ${createLikertOptions(prompt, scale)}
        </div>
    `).join("");
}

// Helper function to generate Likert scale options
function createLikertOptions(name, scale) {
    let options = "";
    for (let i = 1; i <= scale; i++) {
        options += `<label><input type="radio" name="${name}" value="${i}"> ${i}</label> `;
    }
    return options;
}

// Helper function to generate confidence rating questions
function createConfidenceQuestion(question, options, name) {
    return `
        <div style="margin-top: 10px;">
            <label>${question}</label><br>
            ${options.map((option, i) => `
                <label><input type="radio" name="${name}" value="${option}"> ${option}</label>
                <select name="${name}_confidence_${i}" style="margin-left: 10px;">
                    <option value="">-- Confidence --</option>
                    <option value="33%">33%</option>
                    <option value="66%">66%</option>
                    <option value="100%">100%</option>
                </select><br>
            `).join("")}
        </div>
    `;
}

// Add survey questions to timeline
timeline.push(surveyQuestions);

// Define end message
const endMessage = {
    type: "html-button-response",
    stimulus: "<h3>Thank you for completing the survey!</h3><p>Your responses have been recorded.</p>",
    choices: ["Finish"]
};
timeline.push(endMessage);

// Initialize jsPsych
jsPsych.init({
    timeline: timeline,
    display_element: 'jspsych-target',
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
