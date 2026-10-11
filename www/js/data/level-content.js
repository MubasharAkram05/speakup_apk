/* ---- Work section: BASIC level (A1-A2) ----
   Five new units. Same data shape as every other unit:
     sec (section) | t (title) | e (emoji) | s (12 sentences) | w (6 words) | q (4 quiz questions) | ch (chat)
   lv:"basic"  -> shown when the learner taps BASIC on the Home screen
   up:1        -> the ENRICHMENT step below leaves the unit alone (it is already at the right level)
   Sentences are short and simple (present tense, can, will, please). Sentences 1-6 are the easiest.
*/
(function(){
// mk(): small helper that builds one unit object and adds it to BASE.
function mk(slug,t,e,s,w,q,ch){
  BASE.push({sec:"work",lv:"basic",t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"work/basic/"+slug,
    es0:s.slice(0,6),                                           // easy sentences for the first exercise
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})}); // short sentences for listening / speaking
}

// ---- Work Basic 1: Meeting new colleagues ----
mk("meeting-colleagues","Meeting new colleagues","👋",[
 "Hello, my name is Ali.",
 "Nice to meet you.",
 "Where are you from?",
 "I am from Lahore.",
 "What do you do here?",
 "I work in the office downstairs.",
 "This is my colleague, Sara.",
 "Our manager is very kind.",
 "Let me introduce you to the team.",
 "This is your desk, next to the window.",
 "Welcome to the company, we are happy you are here.",
 "Please ask me if you need any help."
],[
 ["Colleague","A person who works with you"],
 ["Manager","The person who leads a team"],
 ["Team","A group of people who work together"],
 ["Desk","A table where you work"],
 ["Introduce","To tell people who someone is"],
 ["Welcome","A friendly word when someone arrives"]
],[
 ["My name ___ Ali.",["am","is","are"],1],
 ["She ___ my colleague.",["is","am","are"],0],
 ["I am ___ Pakistan.",["from","in","at"],0],
 ["Nice ___ meet you.",["to","for","at"],0]
],["Hello, nice to meet you.","Nice to meet you too.","Nice to meet you too. I am a banana."]);

// ---- Work Basic 2: My daily work routine ----
mk("daily-routine","My daily work routine","🕘",[
 "I wake up at six.",
 "I go to work by bus.",
 "I start work at nine.",
 "I drink tea in the morning.",
 "I have a meeting at ten.",
 "I eat food with my friends.",
 "I get to the office at eight thirty.",
 "I have lunch at one o'clock.",
 "We take a short break in the afternoon.",
 "I have three tasks today.",
 "I finish work at five.",
 "Sorry, I am late today."
],[
 ["Office","The place where you work"],
 ["Lunch","The meal in the middle of the day"],
 ["Break","A short rest from work"],
 ["Task","A piece of work to do"],
 ["Finish","To end something"],
 ["Late","Not on time"]
],[
 ["I start work ___ nine o'clock.",["in","at","on"],1],
 ["She ___ to the office every day.",["go","goes","going"],1],
 ["I have lunch ___ one o'clock.",["at","on","in"],0],
 ["We ___ a short break at three.",["take","takes","taking"],0]
],["What time do you finish work?","I finish work at five.","I finish work at the moon."]);

// ---- Work Basic 3: Simple emails and messages ----
mk("emails-and-messages","Simple emails and messages","✉️",[
 "Dear Sara, thank you for your help.",
 "Please call me today.",
 "Thank you very much.",
 "Best regards, Ali.",
 "See you tomorrow.",
 "Please write back soon.",
 "I will send you an email today.",
 "I got your message this morning.",
 "Please find the file attached.",
 "I will reply to you tomorrow.",
 "Please write a short subject for the email.",
 "Can you send me the file again?"
],[
 ["Email","A message you send on a computer"],
 ["Message","Words you send to a person"],
 ["Send","To make something go to someone"],
 ["File","A document on a computer"],
 ["Reply","To answer a message"],
 ["Subject","The short title of an email"]
],[
 ["I ___ an email every day.",["write","writes","writing"],0],
 ["Please send ___ the file.",["I","me","my"],1],
 ["Thank you ___ your help.",["for","at","to"],0],
 ["Here ___ the file you asked for.",["is","are","am"],0]
],["Did you get my email?","Yes, I got it. Thank you.","Yes, I got it. It was a big cheese."]);

// ---- Work Basic 4: Phone calls, the basics ----
mk("phone-basics","Phone calls: the basics","📞",[
 "Hello, this is Ali.",
 "Who is calling, please?",
 "One moment, please.",
 "I am sorry, he is not here.",
 "Can I take a message?",
 "Thank you for calling.",
 "May I speak to Sara, please?",
 "Please wait a moment.",
 "What is your phone number?",
 "Can you repeat that, please?",
 "I will call you back later.",
 "Sorry, I cannot hear you well."
],[
 ["Phone","A device for calling people"],
 ["Call","To use the phone to talk to someone"],
 ["Speak","To talk"],
 ["Wait","To stay until something happens"],
 ["Number","Digits for a phone"],
 ["Repeat","To say again"]
],[
 ["Can I ___ to the manager, please?",["speak","speaks","speaking"],0],
 ["Please ___ a moment.",["wait","waits","waiting"],0],
 ["I ___ call you back later.",["will","am","do"],0],
 ["What ___ your phone number?",["are","is","do"],1]
],["Hello, can I speak to Sara, please?","Yes, one moment, please.","Yes, one moment, please. I am a duck."]);

// ---- Work Basic 5: Asking for help ----
mk("asking-for-help","Asking for help at work","🙋",[
 "Excuse me, can you help me?",
 "Of course, no problem.",
 "I have a question.",
 "I do not understand.",
 "Can you say that again?",
 "Thank you for your time.",
 "Can you show me how to do this?",
 "There is a problem with my computer.",
 "Could you explain this to me, please?",
 "Please speak slowly, I am still learning.",
 "I am sorry, I made a mistake.",
 "Thank you, now I understand."
],[
 ["Help","To make something easier for someone"],
 ["Question","Something you ask"],
 ["Problem","Something that is wrong"],
 ["Explain","To make something clear"],
 ["Understand","To know what something means"],
 ["Show","To let someone see how to do something"]
],[
 ["Can you ___ me, please?",["help","helps","helping"],0],
 ["I ___ understand this word.",["do not","am not","not do"],0],
 ["I have ___ question.",["a","an","the"],0],
 ["Could you ___ this to me?",["explain","explains","explaining"],0]
],["I have a problem with my computer.","Do not worry, I can help you.","Do not worry, my computer can fly."]);

/* ---- Work section: INTERMEDIATE (B1-B2) and ADVANCED (B2-C1) ----
   Same shape as Basic. Intermediate sentences run about 8-13 words, Advanced about 10-18.
   Sentences 1-6 are the easiest; each unit keeps 2 short sentences for listening/speaking. */
function lvmk(lv,slug,t,e,s,w,q,ch){
  BASE.push({sec:"work",lv:lv,t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"work/"+lv+"/"+slug,
    es0:s.slice(0,6),
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})});
}
function mi(slug,t,e,s,w,q,ch){lvmk("inter",slug,t,e,s,w,q,ch)}
function ma(slug,t,e,s,w,q,ch){lvmk("adv",slug,t,e,s,w,q,ch)}

// ===== INTERMEDIATE =====
mi("team-meetings","Team meetings","🗓️",[
 "Thank you all for joining on such short notice.",
 "Let's go through the agenda before we dive into the details.",
 "Could you walk us through the latest sales figures?",
 "I'd like to raise a concern about the timeline.",
 "If we cut the budget, we will have to delay the launch.",
 "Let's agree on the next steps before we leave.",
 "I see your point, but I'm not convinced it will work.",
 "Can we park that issue and come back to it later?",
 "Sara has been asked to lead the new project.",
 "We need everyone's input by Friday.",
 "Let's wrap up here.",
 "I'll circulate the minutes once the meeting has ended."
],[
 ["Agenda","A list of topics to discuss at a meeting"],
 ["Minutes","A written record of what was said in a meeting"],
 ["Input","Ideas or advice that you give to others"],
 ["Timeline","A plan showing when things will happen"],
 ["Convinced","Completely sure that something is true"],
 ["Postpone","To move something to a later time"]
],[
 ["If we ___ the budget, we will delay the launch.",["will cut","cut","cutting"],1],
 ["The meeting ___ by the time I arrived.",["already started","has already started","had already started"],2],
 ["I'd like to raise a concern ___ the timeline.",["for","about","by"],1],
 ["Let's go ___ the agenda before we begin.",["through","over to","across"],0]
],["Do you think we can still meet the deadline?","It's possible, but only if we get extra support.","It's possible, but only if the printer gets a promotion."]);

mi("project-updates","Project updates and reports","📊",[
 "We are slightly behind schedule because the supplier delivered late.",
 "I've been working on the report since early this morning.",
 "Could you give me a quick update on where things stand?",
 "We have completed most of the testing, but a few issues remain.",
 "If we had more staff, we could finish a week earlier.",
 "The client has asked us to revise the original proposal.",
 "I'll keep you posted on any changes.",
 "We're on track for Friday.",
 "The main risk is that the new software may not be ready.",
 "Please flag any delays early.",
 "Progress has been slower than we expected over the last two weeks.",
 "I'll send you a full summary once everything is confirmed."
],[
 ["Supplier","A company that provides goods or materials"],
 ["Revise","To change something to improve it"],
 ["Risk","The chance that something bad may happen"],
 ["Remain","To stay or be left after other things have gone"],
 ["On track","Going as planned and likely to finish on time"],
 ["Flag","To point out a problem so others notice it"]
],[
 ["We ___ on this report since early morning.",["worked since","have been working","are work"],1],
 ["If we had more staff, we ___ finish earlier.",["can","will","could"],2],
 ["The client asked us ___ the proposal.",["revise","to revise","revising"],1],
 ["Progress has been slower ___ we expected.",["than","that","as"],0]
],["Where do we stand with the client's request?","We have finished about half, and the rest is in progress.","We have finished about half, and the rest is in the fridge."]);

mi("professional-emails","Professional emails","📧",[
 "I am writing to follow up on the proposal I sent last week.",
 "Thank you for getting back to me so quickly.",
 "Please find attached the revised contract for your review.",
 "I would be grateful if you could confirm the delivery date.",
 "Unfortunately, I won't be able to attend the meeting on Thursday.",
 "I apologise for the delay in replying to your message.",
 "Could you let me know whether the offer is still available?",
 "I look forward to hearing from you soon.",
 "Thanks again for your help.",
 "Kind regards, Ali.",
 "I'm copying in my manager so that she is aware.",
 "As discussed, I will send the invoice by Monday."
],[
 ["Follow up","To contact someone again about something"],
 ["Revised","Changed to make something better or correct"],
 ["Grateful","Feeling thankful for something"],
 ["Apologise","To say that you are sorry"],
 ["Aware","Knowing that something exists or is happening"],
 ["Invoice","A document asking someone to pay money"]
],[
 ["I would be grateful if you ___ confirm the date.",["can","will","could"],2],
 ["I look forward ___ hearing from you.",["for","to","at"],1],
 ["Please find the contract ___ for your review.",["attach","attached","attaching"],1],
 ["I apologise ___ the delay in replying.",["for","of","about to"],0]
],["Did you receive my email about the contract?","Yes, I'll review it and reply by tomorrow.","Yes, I'll review it and reply by dinosaur."]);

mi("customer-calls","Handling customer calls","🎧",[
 "Thank you for calling, how may I assist you today?",
 "I'm sorry to hear that you had a problem with your order.",
 "Could you give me your order number so I can look into it?",
 "I understand how frustrating this must be for you.",
 "Let me put you on hold while I check the details.",
 "I'll transfer you to a colleague who can approve the refund.",
 "The replacement should arrive within three to five working days.",
 "We apologise for any inconvenience this has caused.",
 "Is there anything else I can help you with?",
 "Thank you for your patience.",
 "Please hold for a moment.",
 "If the problem continues, please call us back."
],[
 ["Refund","Money that is given back to a customer"],
 ["Replacement","A new item that is given instead of a broken one"],
 ["Inconvenience","Trouble or difficulty caused to someone"],
 ["Frustrating","Making you feel annoyed because you cannot fix something"],
 ["Approve","To officially say that something is acceptable"],
 ["Confirmation","A message that says something is definitely arranged"]
],[
 ["We apologise ___ any inconvenience caused.",["of","with","for"],2],
 ["The parcel ___ damaged when it arrived.",["were","was","is being"],1],
 ["If the problem continues, please ___ us back.",["calling","calls","call"],2],
 ["I'll transfer you to a colleague ___ can help.",["who","which","whose"],0]
],["My order arrived damaged, and I want a refund.","I'm very sorry about that, I'll arrange it right away.","I'm very sorry about that, I'll arrange it with my cat."]);

mi("feedback-teamwork","Feedback and teamwork","🤝",[
 "I really appreciate the effort you put into this report.",
 "There are a couple of points I'd like us to improve.",
 "Could I give you some constructive feedback on your presentation?",
 "You handled the difficult client very professionally.",
 "Next time, it would help if you checked the numbers twice.",
 "I'd suggest dividing the work more equally between us.",
 "Thanks for being so open.",
 "We achieved this because everyone pulled together.",
 "Don't take it personally, I'm only trying to help.",
 "Let's set clear goals for the next quarter.",
 "Well done, everyone.",
 "You can always ask me if you get stuck."
],[
 ["Constructive","Helpful and meant to improve something"],
 ["Appreciate","To be thankful for something"],
 ["Achieve","To succeed in doing something"],
 ["Goal","Something you want to reach in the future"],
 ["Stuck","Not able to continue because of a problem"],
 ["Equally","In the same amount for each person"]
],[
 ["It would help if you ___ the numbers twice.",["check","will check","checked"],2],
 ["I'd suggest ___ the work more equally.",["to divide","dividing","divide"],1],
 ["We succeeded ___ everyone pulled together.",["although","so","because"],2],
 ["Don't take it ___, I'm only trying to help.",["personal","personally","person"],1]
],["Can I give you some feedback on the report?","Of course, I'd like to hear it.","Of course, I'd like to taste it."]);

// ===== ADVANCED =====
ma("negotiations","Negotiations and deals","🤝",[
 "We would be willing to reduce the price provided that you commit to a longer contract and pay upfront.",
 "Frankly, the terms you have proposed fall well short of what we were expecting when we began these discussions.",
 "Could we explore a compromise that works for both parties without damaging the relationship we have built over the years?",
 "I'm afraid we cannot go any lower without compromising the quality of our service, which our existing clients rely on.",
 "Had we known about the delay earlier, we would have renegotiated the schedule instead of simply accepting the new deadline.",
 "Let me make it clear that this offer is subject to board approval, which we expect to receive next week.",
 "We are prepared to be flexible on delivery, but payment terms are non-negotiable, as they are set by our finance department.",
 "That seems reasonable in principle, although I would need to consult my team before I can give you a final answer.",
 "Let's settle this today.",
 "We have a deal.",
 "Both sides stand to gain considerably if we reach an agreement this month, provided that the terms remain flexible.",
 "Before we sign anything, I would like to summarise what we have agreed so far, so there is no confusion later."
],[
 ["Compromise","An agreement where each side gives up something"],
 ["Concession","Something you agree to give in order to reach a deal"],
 ["Non-negotiable","Not open to discussion or change"],
 ["Leverage","The power to influence what other people decide"],
 ["Binding","Legally forcing you to keep an agreement"],
 ["Subject to","Depending on something else happening first"]
],[
 ["We will reduce the price ___ you sign a longer contract.",["unless","in case","provided that"],2],
 ["___ we known earlier, we would have changed the plan.",["Had","Have","If had"],0],
 ["Payment terms are ___, so we cannot change them.",["negotiable","non-negotiable","unnegotiated"],1],
 ["Both sides stand ___ gain from a deal.",["for","at","to"],2]
],["Can you lower the price any further?","Only if you agree to a longer contract.","Only if you agree to a longer sandwich."]);

ma("reports-and-analysis","Reports and analysis","📈",[
 "According to the latest figures, revenue has risen by twelve percent compared with last year, which exceeded our original forecast.",
 "The data suggests that customer satisfaction is closely linked to delivery times, although other factors may also play a role.",
 "Despite strong sales in the first half of the year, profits were affected by rising costs and weaker demand overseas.",
 "It is worth noting that these results are only preliminary, so they may change once the final data is available.",
 "We need to identify the root cause of the problem rather than simply treating the symptoms each time they appear.",
 "Overall, the findings point to a clear need for further investment in training, particularly for our newest members of staff.",
 "The report was submitted late due to unforeseen technical problems, which meant that the committee could not review it in time.",
 "Had the team acted sooner on the early warning signs, the losses could have been avoided altogether.",
 "Sales fell sharply in March.",
 "The trend is encouraging.",
 "I would recommend that we review the strategy carefully before the next quarter begins, rather than waiting for further results.",
 "These figures should be interpreted with caution, as they are based on a small sample and a short period of time."
],[
 ["Preliminary","Early and not yet final"],
 ["Interpret","To explain what something means"],
 ["Unforeseen","Not expected or predicted"],
 ["Trend","A general direction in which something is changing"],
 ["Revenue","The total money a company earns before costs"],
 ["Root cause","The main reason why a problem happens"]
],[
 ["Profits fell ___ strong sales in the first half.",["because of","due","despite"],2],
 ["The report ___ late because of technical problems.",["submitted","was submitted","has submit"],1],
 ["I recommend that we ___ the strategy.",["reviewed","review","reviews"],1],
 ["These figures should be ___ with caution.",["interpret","interpreted","interpreting"],1]
],["What do the latest figures tell us?","Revenue is up, although costs are rising too.","Revenue is up, although the moon is down."]);

ma("leading-change","Leading change at work","🔄",[
 "Since the merger, we have been restructuring several departments in order to cut unnecessary costs and avoid repeating the same work.",
 "Some employees are understandably anxious about how these changes will affect their roles, their salaries and their long-term career plans.",
 "It is essential that we communicate openly and keep everyone informed throughout the process, even when the news is not good.",
 "I would encourage you to raise any concerns as early as possible, so that we can address them before they grow.",
 "Not only will the new system save time, but it will also reduce errors and make our reporting far more reliable.",
 "We are hoping to roll out the changes gradually rather than all at once, so that nobody feels overwhelmed.",
 "Were you to resist the change, the project would struggle to succeed, and the whole team would feel the consequences.",
 "The management team is fully committed to supporting staff through the transition, and extra training will be available to anyone who needs it.",
 "Change is never easy.",
 "We value your honesty.",
 "Training sessions will be organised throughout the spring for anyone who needs extra support, regardless of their department or experience.",
 "I'm confident that we will come out of this stronger, provided that we stay honest with each other along the way."
],[
 ["Restructure","To change how a company is organised"],
 ["Transition","A period of change from one situation to another"],
 ["Anxious","Worried and nervous about what may happen"],
 ["Roll out","To introduce something new step by step"],
 ["Committed","Willing to give time and effort to something"],
 ["Gradually","Slowly, in small steps over time"]
],[
 ["Not only ___ the system save time, but it reduces errors.",["does","is","will"],2],
 ["It is essential that everyone ___ informed.",["are kept","is keep","be kept"],2],
 ["We have ___ restructuring since the merger.",["been","being","was"],0],
 ["We plan to roll out the changes ___ rather than at once.",["gradual","gradually","gradualness"],1]
],["How do you think staff will react to the changes?","Some may be anxious, so we should communicate openly.","Some may be anxious, so we should hide in the cupboard."]);

ma("difficult-conversations","Difficult conversations","💬",[
 "I'd like to discuss a sensitive matter with you, and I hope we can talk openly and respectfully about it.",
 "I understand that you may see things differently, and I respect that, but I'd still like to explain my side.",
 "The reason I'm raising this is that the problem has affected the whole team, not just the two of us.",
 "Rather than assigning blame to anyone, let's focus on finding a practical solution that we can both accept.",
 "I may have given the wrong impression in the meeting, so allow me to clarify exactly what I meant.",
 "What concerns me most is that the same mistake keeps happening, even though we have discussed it several times.",
 "Could you help me understand what led to this situation, so that we can prevent it from happening again?",
 "If we are to move forward as a team, both of us need to be honest about what went wrong.",
 "Let's talk calmly.",
 "I hear what you're saying.",
 "I appreciate you taking the time to listen to my concerns, especially since I know how busy this week has been.",
 "Let's agree on specific actions and review our progress in two weeks, so that we can adjust the plan if necessary."
],[
 ["Sensitive","Needing careful handling because it may upset people"],
 ["Blame","To say that someone is responsible for a problem"],
 ["Clarify","To make something easier to understand"],
 ["Impression","The feeling or idea you get about something"],
 ["Defensive","Protecting yourself because you feel criticised"],
 ["Resolve","To find a solution to a problem"]
],[
 ["Rather than assigning ___, let's find a solution.",["blaming","blamed","blame"],2],
 ["Allow me ___ what I meant.",["clarify","to clarify","clarifying"],1],
 ["If we ___ to move forward, we must be honest.",["do","will","are"],2],
 ["What ___ me most is the repeated mistake.",["concerns","concerned","concerning"],0]
],["I think you're being unfair about the mistake.","I understand how you feel, so let's look at the facts together.","I understand how you feel, so let's ask the clock."]);

/* ---- Study section: BASIC level (A1-A2), 5 units. Same shape as Work Basic. ---- */
function smk(slug,t,e,s,w,q,ch){
  BASE.push({sec:"study",lv:"basic",t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"study/basic/"+slug,
    es0:s.slice(0,6),
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})});
}

smk("first-day","My first day at college","🎒",[
 "Hello, I am a new student.",
 "My name is Sara.",
 "Where is my classroom?",
 "What time does class start?",
 "I study computer science.",
 "Nice to meet you.",
 "This is my first day here.",
 "Can I sit next to you?",
 "The teacher is very friendly.",
 "My classes start at nine o'clock.",
 "Please show me the library.",
 "I will see you tomorrow."
],[
 ["Student","A person who studies at a school"],
 ["Teacher","A person who helps you learn"],
 ["Classroom","A room where lessons happen"],
 ["Subject","Something you study, like maths"],
 ["Timetable","A list of lesson times"],
 ["Friendly","Kind and nice to people"]
],[
 ["I ___ a new student.",["am","is","are"],0],
 ["Where ___ my classroom?",["are","is","am"],1],
 ["My class starts ___ nine o'clock.",["on","in","at"],2],
 ["She ___ my teacher.",["are","am","is"],2]
],["Hello, are you a new student?","Yes, I am. Nice to meet you.","Yes, I am. The moon is made of cheese."]);

smk("in-the-classroom","In my classroom","🏫",[
 "Open your book, please.",
 "Sit down, please.",
 "I have a pen.",
 "Can I use your pencil?",
 "Listen to the teacher.",
 "Please close the door.",
 "The board is in front of us.",
 "I do not understand this word.",
 "Can you repeat that, please?",
 "Please write your name here.",
 "We have a test on Friday.",
 "May I go to the toilet?"
],[
 ["Board","A big surface the teacher writes on"],
 ["Desk","A table where you sit and work"],
 ["Notebook","A book where you write notes"],
 ["Pencil","A thing you use to write or draw"],
 ["Lesson","A time when you learn something"],
 ["Question","Something you ask to get an answer"]
],[
 ["Please ___ your book.",["opens","open","opening"],1],
 ["I ___ not understand this word.",["do","am","is"],0],
 ["Can I ___ your pencil?",["using","uses","use"],2],
 ["The board is ___ of the class.",["in front","on front","at front"],0]
],["Do you understand this word?","No, can you repeat it, please?","No, my desk can sing it, please."]);

smk("homework-and-study","Homework and study time","📚",[
 "I have homework today.",
 "I study after dinner.",
 "I read my book every day.",
 "My homework is easy.",
 "I need help with maths.",
 "I write my notes in a notebook.",
 "Do you want to study together?",
 "I study for one hour.",
 "I finish my homework before bed.",
 "The homework is due on Monday.",
 "I turn off my phone when I study.",
 "I study in a quiet room."
],[
 ["Homework","Schoolwork you do at home"],
 ["Notes","Short words you write to remember things"],
 ["Study","To learn about something"],
 ["Maths","The subject of numbers"],
 ["Quiet","Not noisy"],
 ["Together","With another person"]
],[
 ["I ___ homework every day.",["do","does","doing"],0],
 ["She ___ in a quiet room.",["study","studies","studying"],1],
 ["I study ___ one hour.",["on","at","for"],2],
 ["I need help ___ maths.",["of","with","by"],1]
],["Did you finish your homework?","Yes, I finished it after dinner.","Yes, I finished it with my pet whale."]);

smk("at-the-library","At the library","📖",[
 "This is the library.",
 "I want to borrow a book.",
 "Where are the books?",
 "The library is very quiet.",
 "I read a book here.",
 "Please keep your voice low.",
 "How long can I keep it?",
 "I must return it on Monday.",
 "Can I use a computer here?",
 "The library opens at eight.",
 "I need a book about history.",
 "Thank you for your help."
],[
 ["Library","A place with many books to read"],
 ["Borrow","To take something and give it back later"],
 ["Return","To give something back"],
 ["Shelf","A flat board where books are kept"],
 ["Quiet","Not noisy"],
 ["Librarian","A person who works in a library"]
],[
 ["I want to ___ a book.",["borrow","borrows","borrowing"],0],
 ["The library ___ quiet.",["am","are","is"],2],
 ["I must ___ the book on Monday.",["returning","returns","return"],2],
 ["The library opens ___ eight.",["on","at","in"],1]
],["Can I borrow this book, please?","Yes, you can keep it for two weeks.","Yes, you can keep it until the books fly."]);

smk("tests-and-exams","Tests and exams","📝",[
 "I have a test today.",
 "I am a little nervous.",
 "I study for my exam.",
 "The test is easy.",
 "I got a good mark.",
 "I did my best.",
 "The exam starts at ten.",
 "Please bring a pen and a ruler.",
 "I need to study more.",
 "I will check my answers again.",
 "The results come out next week.",
 "I am happy with my mark."
],[
 ["Test","A short check of what you know"],
 ["Exam","A big test at the end of a course"],
 ["Mark","A number or letter showing how well you did"],
 ["Answer","What you say or write to a question"],
 ["Nervous","A little afraid or worried"],
 ["Result","What you get at the end of a test"]
],[
 ["I ___ a test today.",["has","have","having"],1],
 ["The exam ___ at ten.",["start","starts","starting"],1],
 ["I ___ nervous before the test.",["am","is","are"],0],
 ["I got a good ___.",["moon","map","mark"],2]
],["How was your test today?","It was easy, and I think I did well.","It was easy, and the pencil did it for me."]);

/* ---- Study section: INTERMEDIATE level (B1-B2), 5 units. 2 short sentences per unit for Listen/Speak. ---- */
function sim(slug,t,e,s,w,q,ch){
  BASE.push({sec:"study",lv:"inter",t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"study/inter/"+slug,
    es0:s.slice(0,6),
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})});
}

sim("lectures-and-notes","Lectures and note-taking","🎧",[
 "Could you repeat the last point? I didn't catch it.",
 "I usually record the lecture so I can review it later.",
 "The professor spoke so quickly that I couldn't keep up.",
 "It helps to read the chapter before the lecture starts.",
 "I write down key words instead of whole sentences.",
 "If you miss a class, you should ask a classmate for notes.",
 "Could you explain how this theory differs from the previous one?",
 "I always highlight the main ideas and review them at the weekend.",
 "Let's compare notes.",
 "I missed that point.",
 "By the end of the semester, I had filled three notebooks.",
 "Although the topic was difficult, the examples made it much clearer."
],[
 ["Lecture","A talk given by a teacher to a large group"],
 ["Highlight","To mark the important parts of a text"],
 ["Theory","An idea that explains how something works"],
 ["Keep up","To move or learn at the same speed as others"],
 ["Review","To look at something again to remember it"],
 ["Semester","Half of an academic year"]
],[
 ["The professor spoke so quickly that I couldn't ___.",["keep up","keep on","catch in"],0],
 ["If you ___ a class, ask a classmate for notes.",["lose","skip out","miss"],2],
 ["I'd like to review the lecture ___ the exam.",["since","during","before"],2],
 ["By the end of the term, I ___ three notebooks.",["fill","had filled","am filling"],1]
],["Did you understand today's lecture?","Mostly, but I need to review the second half.","Mostly, but I need to feed the second half."]);

sim("writing-essays","Writing essays","✍️",[
 "My essay needs a clear introduction and a strong conclusion.",
 "I spent the whole weekend researching sources for my argument.",
 "You should support every point with evidence rather than opinion alone.",
 "I always write an outline before I start the first draft.",
 "The tutor said my paragraphs were well organised but too long.",
 "If I had started earlier, I would have finished on time.",
 "Remember to reference every quotation, or it counts as plagiarism.",
 "After I edited the second draft, the essay flowed much better.",
 "I'll proofread it tonight.",
 "The deadline is tomorrow.",
 "Instead of repeating the same idea, try to develop it further.",
 "Could you check whether my argument makes sense to a reader?"
],[
 ["Outline","A short plan of the main points to write"],
 ["Evidence","Facts that show something is true"],
 ["Plagiarism","Using someone else's work as your own"],
 ["Draft","A first version of a piece of writing"],
 ["Argument","A set of reasons that support an idea"],
 ["Conclusion","The final part of an essay"]
],[
 ["If I had started earlier, I ___ finished on time.",["will have","had","would have"],2],
 ["Every quotation needs a ___.",["reference","referee","refer"],0],
 ["Always support your points ___ evidence.",["of","with","by"],1],
 ["Instead of ___ the same idea, develop it.",["repeat","repeated","repeating"],2]
],["How is your essay going?","I've finished the first draft, and now I'm editing it.","I've finished the first draft, and now I'm feeding it."]);

sim("class-presentations","Class presentations","🎤",[
 "Today I'm going to talk about renewable energy in our country.",
 "First, I'll give an overview, and then I'll explain the main causes.",
 "As you can see from this chart, usage has doubled since 2015.",
 "Please feel free to ask questions at the end of my talk.",
 "I practised my speech several times so that I wouldn't forget it.",
 "Your slides should contain key points rather than long paragraphs.",
 "To sum up, there are three main benefits of this approach.",
 "Could you speak a little louder? We can't hear you at the back.",
 "Thank you for listening.",
 "Any questions?",
 "My partner will now continue with the second part of the presentation.",
 "I felt nervous at first, but I relaxed once I started."
],[
 ["Overview","A short general description of something"],
 ["Audience","The people who watch or listen to you"],
 ["Chart","A picture that shows numbers clearly"],
 ["Summarise","To give only the main points"],
 ["Rehearse","To practise before a real performance"],
 ["Key point","An important idea that people must remember"]
],[
 ["I practised several times ___ I wouldn't forget it.",["because of","in case of","so that"],2],
 ["As you can see ___ this chart, usage has doubled.",["in","from","at"],1],
 ["Please feel free ___ questions at the end.",["asking","ask","to ask"],2],
 ["I felt nervous ___ first, but I relaxed.",["at","on","in"],0]
],["Are you ready for your presentation?","Almost, I just need to practise the ending once more.","Almost, I just need to practise with the moon."]);

sim("online-learning","Online learning","💻",[
 "I prefer online classes because I can study at my own pace.",
 "The connection kept dropping, so I missed half of the lesson.",
 "Please mute your microphone unless you are speaking.",
 "You can access all the course materials through the student portal.",
 "I find it harder to stay focused when I study alone at home.",
 "The recording will be uploaded after the session for anyone who missed it.",
 "Could you share your screen so that everyone can see the slides?",
 "The assignment must be submitted online before midnight on Friday.",
 "I'm having trouble logging in.",
 "Can you hear me?",
 "Although it's convenient, online learning requires a lot of self-discipline.",
 "If the platform crashes again, we will have to reschedule the quiz."
],[
 ["Portal","A website where students find course information"],
 ["Upload","To send a file from your computer to the internet"],
 ["Self-discipline","The ability to make yourself do things"],
 ["Platform","A website or program used for a service"],
 ["Access","To be able to open or use something"],
 ["Convenient","Easy and suitable for your needs"]
],[
 ["Please ___ your microphone unless you are speaking.",["muting","muted","mute"],2],
 ["The recording ___ uploaded after the session.",["will be","will","is"],0],
 ["I find it hard ___ focused when I study alone.",["staying","to stay","stay"],1],
 ["If the platform crashes again, we ___ reschedule the quiz.",["has to","had","will have to"],2]
],["Why do you prefer online classes?","I can study at my own pace and save travel time.","I can study at my own pace and sleep on the roof."]);

sim("time-management","Managing your study time","⏰",[
 "I make a weekly plan so that I never miss a deadline.",
 "It's tempting to scroll through my phone instead of studying.",
 "If you break a big task into smaller steps, it feels easier.",
 "I usually study for forty minutes and then take a short break.",
 "I've been trying to wake up earlier to use the quiet hours.",
 "Leaving everything until the last minute only increases stress.",
 "I need to prioritise my assignments according to their deadlines.",
 "She manages to balance her studies, her job, and her social life.",
 "Plan ahead.",
 "Stay focused.",
 "After I started using a planner, my grades improved noticeably.",
 "Remember to leave some free time, otherwise you will burn out."
],[
 ["Deadline","The last time by which work must be finished"],
 ["Prioritise","To decide what is most important to do first"],
 ["Procrastinate","To delay doing something you should do now"],
 ["Planner","A book or app for organising your time"],
 ["Balance","To give the right amount of time to different things"],
 ["Burn out","To become very tired from working too hard"]
],[
 ["I make a plan ___ I never miss a deadline.",["because","although","so that"],2],
 ["Leaving things until the last minute ___ stress.",["increase","increases","increasing"],1],
 ["She manages ___ her studies and her job.",["balancing","to balance","balance"],1],
 ["After I ___ using a planner, my grades improved.",["started","start","starts"],0]
],["How do you manage your study time?","I make a weekly plan and take short breaks.","I make a weekly plan and take a nap with a dragon."]);

/* ---- Study section: ADVANCED level (B2-C1), 4 units. 2 short sentences per unit for Listen/Speak. ---- */
function sma(slug,t,e,s,w,q,ch){
  BASE.push({sec:"study",lv:"adv",t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"study/adv/"+slug,
    es0:s.slice(0,6),
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})});
}

sma("research-methods","Research methods and data","🔬",[
 "The study was based on a survey of five hundred students from three different universities across the country.",
 "Before collecting any data, researchers must obtain informed consent from every participant who takes part in the study.",
 "Although the sample was relatively small, the results were consistent enough to suggest a genuine pattern.",
 "It is important to distinguish between correlation and causation, since two variables moving together does not prove that one causes the other.",
 "The findings were statistically significant, which means they are unlikely to have occurred purely by chance.",
 "Had the researchers used a larger sample, their conclusions would have carried considerably more weight.",
 "A control group was included so that the effect of the new method could be measured accurately.",
 "Critics argue that the questionnaire was biased, as several questions encouraged participants to give a particular answer.",
 "The sample was small.",
 "Results may vary.",
 "We analysed the data using specialised software, and the outcomes were then compared with previous studies.",
 "Future research should examine whether these results can be replicated in other countries and age groups."
],[
 ["Sample","A small group chosen to represent a larger group"],
 ["Variable","A factor that can change in a study"],
 ["Correlation","A link between two things that change together"],
 ["Significant","Large or important enough to be noticed"],
 ["Bias","An unfair preference that affects results"],
 ["Replicate","To repeat a study and get the same result"]
],[
 ["Two variables moving together does not prove ___.",["caused","cause of","causation"],2],
 ["___ the researchers used a larger sample, the findings would be stronger.",["Had","Have","Would"],0],
 ["A control group was included ___ the effect could be measured.",["even if","in spite of","so that"],2],
 ["The results are unlikely to have occurred ___ chance.",["in","by","on"],1]
],["Why should we be careful with a small sample?","Because the results may not represent the whole population.","Because the results may not represent the whole zoo."]);

sma("critical-thinking","Critical thinking and debate","🧠",[
 "A convincing argument must be supported by reliable evidence rather than personal opinion or emotional appeal alone.",
 "While the author makes a strong case, she overlooks several important counterarguments that weaken her conclusion.",
 "It could be argued that technology has widened inequality, although others would claim that it has created new opportunities.",
 "We should question the source of the statistics before accepting them as proof of the claim.",
 "Not only does the text lack evidence, but it also relies heavily on assumptions that are never explained.",
 "Having considered both sides, I am inclined to agree with the second view, albeit with some reservations.",
 "The writer's tone suggests a bias, which makes it harder to trust the overall message.",
 "Rather than simply accepting what we read, we ought to evaluate how persuasive and fair it really is.",
 "That is a fair point.",
 "I remain unconvinced.",
 "Her argument would have been far stronger if she had addressed the opposing evidence directly.",
 "Whatever your position, you must be ready to defend it with clear reasoning."
],[
 ["Counterargument","An argument that goes against another argument"],
 ["Assumption","Something you accept as true without proof"],
 ["Evaluate","To judge how good or reliable something is"],
 ["Persuasive","Able to make people believe or do something"],
 ["Bias","An unfair preference for one side"],
 ["Reservation","A doubt about whether something is a good idea"]
],[
 ["Not only ___ the text lack evidence, but it relies on assumptions.",["is","has","does"],2],
 ["Having ___ both sides, I agree with the second view.",["consider","considered","considering"],1],
 ["Her argument would have been stronger if she ___ the opposing evidence.",["addresses","had addressed","would address"],1],
 ["Rather than simply accepting it, we ought ___ it.",["evaluating","to evaluate","evaluate"],1]
],["Do you find the author's argument convincing?","Partly, but she overlooks some important counterarguments.","Partly, but she overlooks the talking sandwich."]);

sma("dissertation","Writing a dissertation","🎓",[
 "My supervisor has advised me to narrow the research question so that the project remains manageable within the time available.",
 "The literature review should not merely summarise previous studies but critically evaluate how they relate to my own research.",
 "I am required to submit a detailed proposal outlining my aims, methodology and expected outcomes by the end of the month.",
 "Having collected the data, I now face the challenge of presenting the results clearly and coherently.",
 "Each chapter needs to build logically on the previous one, otherwise the argument will feel disjointed.",
 "Were it not for my supervisor's feedback, I would have continued using an unsuitable research design.",
 "All sources must be cited consistently, and the bibliography should follow the referencing style specified by the department.",
 "The word limit is strict, so I have had to cut several sections that were interesting but not essential.",
 "My deadline is looming.",
 "I need more sources.",
 "Once the final draft is complete, it will be checked for plagiarism before being sent to the examiners.",
 "I plan to defend my findings confidently during the oral examination next spring."
],[
 ["Supervisor","A teacher who guides your research project"],
 ["Methodology","The methods used to carry out research"],
 ["Bibliography","A list of all the sources used in a piece of work"],
 ["Coherent","Clear, logical and easy to follow"],
 ["Cite","To mention a source as evidence"],
 ["Proposal","A detailed plan that you ask someone to approve"]
],[
 ["The literature review should not merely summarise but ___ evaluate.",["critical","criticism","critically"],2],
 ["___ it not for my supervisor, I would have used the wrong design.",["Was","Had","Were"],2],
 ["All sources must ___ consistently.",["cite","be cited","citing"],1],
 ["I have had to cut sections ___ the strict word limit.",["because","due to","although"],1]
],["How is your dissertation progressing?","I've finished the data collection, so I'm drafting the results chapter.","I've finished the data collection, so I'm drafting the chapter with a penguin."]);

sma("seminars","Seminars and academic discussion","🗣️",[
 "I would like to build on what Ahmed said by pointing out an aspect that has not yet been discussed.",
 "With all due respect, I think that interpretation overlooks the historical context in which the policy was introduced.",
 "What the author fails to acknowledge is that economic growth does not automatically lead to a fairer society.",
 "Could you elaborate on that point, as I am not sure I fully understand how it connects to your main argument?",
 "Participants are expected to read the assigned articles in advance so that the discussion can go beyond basic summaries.",
 "Although I see where you are coming from, the evidence points in the opposite direction.",
 "I take your point, but I would argue that the situation is considerably more complicated than you suggest.",
 "The seminar leader encouraged us to challenge each other's assumptions respectfully rather than simply agreeing for the sake of harmony.",
 "That's an interesting view.",
 "May I add something?",
 "By the end of the session, we had reached a more nuanced understanding of the issue.",
 "I look forward to continuing this debate in next week's seminar."
],[
 ["Elaborate","To give more details about something"],
 ["Nuanced","Showing small but important differences"],
 ["Acknowledge","To accept that something is true or exists"],
 ["Interpretation","A particular way of understanding something"],
 ["Challenge","To question whether something is right"],
 ["Context","The situation in which something happens"]
],[
 ["I would like to build ___ what Ahmed said.",["at","in","on"],2],
 ["What the author fails ___ is that growth does not mean fairness.",["acknowledging","to acknowledge","acknowledge"],1],
 ["Read the articles in advance ___ the discussion can go deeper.",["so that","even though","as if"],0],
 ["By the end of the session, we ___ a more nuanced understanding.",["reach","had reached","are reaching"],1]
],["Could you elaborate on your last point?","Certainly, I think the policy ignored the historical context.","Certainly, I think the policy ignored the talking pencil."]);

/* ---- Teaching section: BASIC (5), INTERMEDIATE (5), ADVANCED (4) ---- */
function tmk(lv,slug,t,e,s,w,q,ch){
  BASE.push({sec:"teaching",lv:lv,t:t,e:e,s:s,w:w,q:q,ch:ch,up:1,id:"teaching/"+lv+"/"+slug,
    es0:s.slice(0,6),
    sh0:s.filter(function(x){return x.split(/\s+/).length<=6})});
}

// ===== BASIC (A1-A2) =====
tmk("basic","greeting-the-class","Greeting the class","👋",[
 "Good morning, class.","Please sit down.","How are you today?","Welcome to my class.","My name is Mr. Ali.","Are you ready?",
 "Please listen to me.","Let us start the lesson.","Raise your hand, please.","Who is absent today?","Thank you for being on time.","Today we will learn new words."
],[["Class","A group of students who learn together"],["Teacher","A person who helps you learn"],["Student","A person who studies at a school"],["Lesson","A time when you learn something"],["Absent","Not at school or in class"],["Ready","Prepared to start"]],
[["Good ___, class.",["mouse","moon","morning"],2],["How ___ you today?",["is","are","am"],1],["Please ___ down.",["sit","sits","sitting"],0],["My name ___ Mr. Ali.",["am","are","is"],2]],
["Good morning, teacher.","Good morning. Please sit down.","Good morning. Please sit on the ceiling."]);

tmk("basic","classroom-rules","Classroom rules","📏",[
 "Be quiet, please.","Do not run.","Raise your hand.","Listen to your friend.","Keep your desk clean.","Do not shout.",
 "Please wait for your turn.","Put your bag under the desk.","Be kind to everyone.","We do not use phones here.","Come to class on time.","Always say please and thank you."
],[["Rule","A thing you must or must not do"],["Quiet","Not noisy"],["Turn","Your chance to do something"],["Kind","Nice and helpful to others"],["Desk","A table where you sit and work"],["Clean","Not dirty"]],
[["Please be ___.",["quit","quietly","quiet"],2],["Do not ___ in class.",["run","runs","running"],0],["Wait ___ your turn.",["on","for","at"],1],["We ___ not use phones.",["does","is","do"],2]],
["May I talk now, teacher?","Please raise your hand first.","Please raise your hat first."]);

tmk("basic","praise-and-help","Praising and helping students","🌟",[
 "Good job!","Well done.","That is correct.","Try again.","You can do it.","Do you need help?",
 "I am proud of you.","Very good answer.","Let me help you.","Take your time.","Do not worry about mistakes.","Great work today."
],[["Proud","Happy about what someone did"],["Correct","Right, with no mistakes"],["Mistake","Something you do wrong by accident"],["Help","To make something easier for someone"],["Try","To do your best to do something"],["Answer","What you say to a question"]],
[["Do you need ___?",["helps","helping","help"],2],["That is ___.",["correct","correctly","correction"],0],["I am proud ___ you.",["at","of","in"],1],["Please ___ again.",["tries","trying","try"],2]],
["I made a mistake, teacher.","Do not worry, try again.","Do not worry, try the moon."]);

tmk("basic","asking-questions","Asking simple questions","❓",[
 "What is your name?","How old are you?","Do you understand?","What is this?","Who knows the answer?","Can you read this word?",
 "Where is your book?","Is this a noun or a verb?","What color is the apple?","How do you spell this word?","Can you say it again?","Which one is bigger?"
],[["Question","Something you ask to get an answer"],["Answer","What you say to a question"],["Spell","To say the letters of a word"],["Word","A group of letters with a meaning"],["Understand","To know what something means"],["Color","Red, blue or green, for example"]],
[["___ is your name?",["Who","What","Where"],1],["Do you ___?",["understands","understanding","understand"],2],["How do you ___ this word?",["spell","spells","spelling"],0],["___ is your book?",["When","Who","Where"],2]],
["What is this?","It is an apple.","It is a flying carpet."]);

tmk("basic","end-of-lesson","End of the lesson","🔔",[
 "The lesson is over.","Please pack your bags.","Do your homework tonight.","See you tomorrow.","Write this in your notebook.","Clean the board, please.",
 "Stand in a line.","Thank you, everyone.","Did you enjoy the lesson?","Please push in your chairs.","Read page ten at home.","Have a nice day."
],[["Homework","Schoolwork you do at home"],["Bell","A thing that rings to show the time"],["Notebook","A book where you write notes"],["Line","People standing one behind another"],["Tomorrow","The day after today"],["Chair","A seat for one person"]],
[["See you ___.",["yesterday","tomorrows","tomorrow"],2],["Please ___ your bags.",["pack","packs","packing"],0],["Do your homework ___.",["last night","tonight","ago"],1],["Stand ___ a line.",["on","in","of"],1]],
["Is the lesson over, teacher?","Yes, please pack your bags.","Yes, please pack your elephant."]);

// ===== INTERMEDIATE (B1-B2) =====
tmk("inter","starting-a-lesson","Starting a lesson","🚀",[
 "Today we are going to learn how to describe our daily routines.",
 "Before we begin, let's review what we covered last lesson.",
 "By the end of the lesson, you will be able to ask simple questions.",
 "Please open your books to page twenty and look at the picture.",
 "Can anyone tell me what they remember from yesterday?",
 "I'd like you to work in pairs for the first activity.",
 "Let's get started.","Settle down, everyone.",
 "If you have any questions, don't hesitate to ask me.",
 "We have a lot to cover today, so please pay attention.",
 "First, I'll show you an example, and then you can try.",
 "Make sure you have a pen and your notebook ready."
],[["Review","To look at something again to remember it"],["Objective","The goal you want to reach"],["Activity","A task that students do"],["Pair","Two people working together"],["Cover","To include a topic in a lesson"],["Attention","Careful listening or looking"]],
[["By the end, you ___ be able to ask questions.",["do","are","will"],2],["Before we begin, let's ___ last lesson.",["review","reviewing","reviewed"],0],["Please work ___ pairs.",["on","in","at"],1],["We have a lot ___ cover today.",["for","to","of"],1]],
["What are we learning today?","We are learning how to describe our daily routines.","We are learning how to describe our dancing toasters."]);

tmk("inter","explaining-ideas","Explaining new ideas","💡",[
 "Let me explain this with a simple example from everyday life.",
 "Think of it as a recipe, where each step follows the last.",
 "The main difference between these two words is how formal they sound.",
 "If you don't understand, I'll explain it again in a different way.",
 "Look at the diagram on the board while I go through it.",
 "This rule applies to most verbs, but there are a few exceptions.",
 "Does that make sense?","Any questions so far?",
 "Imagine you are waiting for a bus and it is late.",
 "The key point to remember is that the verb changes.",
 "Let's practise this together before you try it alone.",
 "Can someone put the rule into their own words?"
],[["Example","A case that shows what you mean"],["Exception","Something that does not follow the rule"],["Diagram","A simple drawing that explains something"],["Rule","A statement about how something works"],["Key point","The most important idea"],["Formal","Polite and serious in style"]],
[["This rule applies ___ most verbs.",["at","to","for"],1],["If you don't understand, I ___ explain it again.",["did","have","will"],2],["The main ___ between these words is formality.",["different","difference","differently"],1],["Look ___ the diagram on the board.",["at","to","in"],0]],
["I don't understand this rule, teacher.","No problem, let me explain it with another example.","No problem, let me explain it with a flying cow."]);

tmk("inter","checking-understanding","Checking understanding","✅",[
 "Can you explain in your own words what we just learned?",
 "Raise your hand if you are not sure about the answer.",
 "Let's check the answers together before we move on.",
 "Who can give me an example of a sentence using this word?",
 "I'd like to see how well you have understood the lesson.",
 "Show me with your fingers: is the answer one, two, or three?",
 "Well done.","Try again.",
 "That's almost right, but look at the verb again.",
 "Please turn to your partner and compare your answers.",
 "If you finish early, you can start the extra exercise.",
 "I'll walk around and help anyone who is stuck."
],[["Understand","To know what something means"],["Compare","To look at how things are alike or different"],["Stuck","Not able to continue because of a problem"],["Exercise","A task for practising a skill"],["Check","To make sure something is correct"],["Partner","The person you work with"]],
[["Raise your hand if you are not ___ about the answer.",["sorry","safe","sure"],2],["Who can give me an ___ of a sentence?",["example","examples","exampled"],0],["If you finish early, you ___ start the extra exercise.",["do","can","are"],1],["I'll help anyone ___ is stuck.",["who","which","whose"],0]],
["I think the answer is two.","That's almost right, but look at the verb again.","That's almost right, but look at the penguin again."]);

tmk("inter","progress-reports","Reporting progress to parents","👨‍👩‍👧",[
 "Thank you for coming in to talk about your daughter's progress.",
 "She has improved a great deal since the start of the term.",
 "Her reading is excellent, but she sometimes rushes her written work.",
 "I'd recommend that she practises for twenty minutes every evening.",
 "He is a polite student, although he can be easily distracted.",
 "If you have any concerns, please contact me through the school office.",
 "We'll review his progress again at the end of next month.",
 "Please sign this form.","Thanks for your support.",
 "She works well in groups and often helps her classmates.",
 "His attendance has been very good this semester.",
 "Could you encourage him to read a little more at home?"
],[["Progress","Improvement over a period of time"],["Concern","A worry about something important"],["Distracted","Unable to focus because of something else"],["Attendance","How often a student comes to school"],["Encourage","To give someone support and confidence"],["Recommend","To suggest that something is a good idea"]],
[["She has improved a great ___ since September.",["deal","lot of","many"],0],["I'd recommend that she ___ every evening.",["practises","practising","practise"],2],["He is polite, ___ he can be easily distracted.",["so","although","because"],1],["Please contact me ___ the school office.",["among","across","through"],2]],
["How is my son doing in class?","He is doing well, and he works hard.","He is doing well, and he teaches the chairs."]);

tmk("inter","correcting-mistakes","Correcting mistakes kindly","🖊️",[
 "That's a good try, but let's look at the verb again.",
 "Instead of saying 'I goed', we say 'I went'.",
 "Don't worry, everyone makes mistakes when they learn a language.",
 "Can you see where the mistake is in this sentence?",
 "Let's correct it together so you remember it next time.",
 "I like how you used a new word, but the spelling needs checking.",
 "Try again.","Good attempt.",
 "If you say it more slowly, it will sound clearer.",
 "Notice that we use 'an' before a vowel sound.",
 "I'll write the correct version on the board for everyone.",
 "Mistakes help us learn, so please keep trying."
],[["Mistake","Something you do wrong by accident"],["Correct","To change something so it is right"],["Attempt","An effort to do something"],["Spelling","The correct letters in a word"],["Vowel","The letters a, e, i, o and u"],["Notice","To see or pay attention to something"]],
[["Instead of 'I goed', we say 'I ___'.",["gone","go","went"],2],["Everyone ___ mistakes when they learn.",["make","makes","making"],1],["Let's correct it so you ___ it next time.",["remember","remembers","remembered"],0],["We use 'an' before a ___ sound.",["verb","vowel","valley"],1]],
["I think the word is spelled wrong.","Good try. Let's check the spelling together.","Good try. Let's check the spelling with a goat."]);

// ===== ADVANCED (B2-C1) =====
tmk("adv","curriculum-design","Curriculum design and objectives","📐",[
 "Effective lesson planning begins with clearly defined objectives that describe what learners should be able to do by the end of the unit.",
 "Rather than covering as much content as possible, we should prioritise depth of understanding over breadth of coverage.",
 "The curriculum has been redesigned so that each unit builds progressively on the skills developed in the previous one.",
 "Learning outcomes must be measurable, otherwise it becomes impossible to judge whether the teaching has actually been successful.",
 "Had the department consulted teachers earlier, the new syllabus would have been far more realistic in terms of timing.",
 "Not only should the materials be engaging, but they should also reflect the diverse backgrounds of our students.",
 "It is essential that assessment criteria are shared with learners from the very beginning of the course.",
 "Each lesson should include a clear connection to real-world situations in which students are likely to use the language.",
 "Plan with purpose.","Outcomes drive teaching.",
 "Once the pilot unit has been evaluated, we will adjust the timing and resources accordingly.",
 "The scheme of work will be reviewed every term to ensure it remains relevant and up to date."
],[["Objective","A goal that a lesson aims to reach"],["Curriculum","The subjects and topics a school teaches"],["Outcome","A result that you can see or measure"],["Syllabus","A list of topics covered in a course"],["Progressive","Developing step by step"],["Criteria","Standards used to judge something"]],
[["Learning outcomes must be ___.",["measure","measurable","measurement"],1],["___ the department consulted teachers, the syllabus would be better.",["Have","Would","Had"],2],["Not only ___ the materials be engaging, but they should reflect our students.",["should","are","do"],0],["It is essential that criteria ___ shared early.",["are","be","is"],1]],
["Why do we need clear learning objectives?","They help us measure whether the teaching has been successful.","They help us measure whether the teaching has been tasty."]);

tmk("adv","mixed-ability","Teaching mixed-ability classes","🎚️",[
 "In a mixed-ability class, the challenge lies in keeping advanced learners stimulated without leaving weaker students behind.",
 "Differentiation does not mean setting completely different tasks, but offering varied levels of support within the same activity.",
 "Stronger students might extend the task by justifying their answers, whereas others could work from a sentence frame.",
 "Grouping learners flexibly, rather than permanently, prevents anyone from feeling labelled as weak or as a high achiever.",
 "Were I to give every student identical worksheets, some would finish in minutes while others would barely begin.",
 "It is important to build confidence among reluctant speakers before expecting them to contribute in front of the whole class.",
 "Peer teaching benefits both parties, since explaining a concept to someone else deepens one's own understanding.",
 "Providing a choice in how learners demonstrate their knowledge often increases motivation and engagement considerably.",
 "Everyone can succeed.","Support, then stretch.",
 "Whatever the level, every learner deserves tasks that are challenging enough to be interesting but not impossible.",
 "By monitoring carefully during activities, teachers can adjust their support as soon as someone begins to struggle."
],[["Differentiation","Adapting teaching to suit different learners"],["Reluctant","Not willing or not eager to do something"],["Peer","A person of the same age or level"],["Scaffolding","Temporary support that helps learners succeed"],["Mixed-ability","Having students of different levels"],["Engagement","Active interest and involvement in something"]],
[["Differentiation does not mean ___ completely different tasks.",["set","setting","to set"],1],["___ I to give identical worksheets, some would struggle.",["Was","Were","Had"],1],["Peer teaching helps both sides, ___ explaining deepens understanding.",["unless","whereas","since"],2],["It is important to build confidence ___ reluctant speakers.",["between","among","into"],1]],
["How do you support weaker students without slowing the others?","I offer sentence frames while stronger students extend the task.","I offer sentence frames while stronger students extend the moon."]);

tmk("adv","assessment-strategies","Assessment and feedback strategies","📋",[
 "Formative assessment, unlike a final exam, allows teachers to adapt their instruction while learning is still taking place.",
 "Feedback is most effective when it is specific, timely, and focused on how the learner can improve rather than on the grade.",
 "Rubrics make marking more consistent, provided that the criteria are written in language students can genuinely understand.",
 "Having reviewed the test results, I realised that most errors stemmed from a misunderstanding of the instructions rather than the content.",
 "It would be unfair to penalise students for mistakes in areas that had not been taught explicitly.",
 "Self-assessment encourages learners to take responsibility for their progress and to identify gaps in their own knowledge.",
 "If feedback is delayed for too long, students lose interest and the opportunity to learn from their errors disappears.",
 "Rather than simply correcting every error, I encourage learners to find and fix mistakes themselves using a checklist.",
 "Feedback should guide.","Mark with purpose.",
 "Assessment should reflect what was taught, otherwise the results tell us very little about learning.",
 "Combining tests, projects and observation gives a far more balanced picture of each learner's ability."
],[["Formative","Done during learning to help improve it"],["Rubric","A chart that shows how work will be marked"],["Penalise","To give a punishment or lower mark"],["Explicitly","In a clear and direct way"],["Checklist","A list of things to check one by one"],["Timely","Happening at the right time"]],
[["Feedback is most effective when it is specific and ___.",["timing","time","timely"],2],["Rubrics improve consistency, ___ the criteria are clearly written.",["unless","provided that","even though"],1],["It would be unfair to penalise students for areas that ___ taught.",["were not","had not been","did not"],1],["Having ___ the results, I realised most errors came from the instructions.",["review","reviewed","reviewing"],1]],
["Why is early feedback so important?","Because students can still learn from their errors.","Because students can still learn from their pizza."]);

tmk("adv","reflective-practice","Reflective practice and growth","🪞",[
 "Reflective practice involves examining what happened in a lesson, why it happened, and what could be done differently next time.",
 "After observing my own recorded lesson, I noticed that I dominated the discussion far more than I had intended.",
 "Had I allowed more thinking time after asking each question, the quieter students might have participated.",
 "Collaborating with colleagues is invaluable, as an outsider can often notice patterns that we overlook in our own teaching.",
 "Professional development should not be treated as an occasional event but as a continuous process throughout one's career.",
 "Although the new method seemed promising, it failed to engage students because I had underestimated how much preparation it required.",
 "Keeping a teaching journal helps me identify recurring problems and measure whether my adjustments are actually working.",
 "It is only by being honest about our weaknesses that we can set realistic goals for improvement.",
 "Teaching never stands still.","Learn from every lesson.",
 "Observation feedback is most valuable when it is descriptive rather than judgemental in tone.",
 "I intend to experiment with student-led activities next term and evaluate their impact carefully."
],[["Reflective","Thinking carefully about your own actions"],["Observe","To watch something carefully"],["Journal","A notebook where you write about your experiences"],["Development","Growth and improvement over time"],["Recurring","Happening again and again"],["Underestimate","To think something is smaller than it is"]],
[["After ___ my own recorded lesson, I noticed I talked too much.",["observe","observing","observed"],1],["___ I allowed more thinking time, quieter students might have spoken.",["Have","If had","Had"],2],["It is only ___ being honest that we can set realistic goals.",["at","by","for"],1],["The method failed because I ___ how much preparation it needed.",["underestimate","had underestimated","am underestimating"],1]],
["What did you learn from watching your recorded lesson?","I realised I talked too much and should allow more thinking time.","I realised I talked too much and should allow more flying time."]);

/* ---- Level tags for the OLD Work units ----
   Old Phone calls and Teamwork are plain A2-B1, so they count as Intermediate.
   The other old Work units (Meetings, Emails, Presentations) stay Advanced. */
BASE.forEach(function(u){
  if(u.id==="work/phone-calls-and-messages"||u.id==="work/teamwork-and-projects")u.lv="inter";
  else if(u.id==="study/study-and-exams")u.lv="adv";
  else if(u.id==="teaching/in-the-classroom")u.lv="adv";
  else if(u.sec==="work"&&!u.lv)u.lv="adv";
});
})();
// ENRICHMENT: makes the remaining units richer and harder (longer sentences, harder words).
// Units with up:1 and the "adv" section are skipped. No CEFR label is set for the others.
/* ---- content enrichment: extra vocabulary, sentences, quiz items ---- */
// BANK = extra vocabulary per section / field. One string per key:
//   "Word|Meaning|Example sentence;Word|Meaning|Example sentence;..."
var BANK={
work:"Agenda|A list of topics for a meeting|Let us check the agenda before we start.;Stakeholder|A person who is affected by a project|Every stakeholder must approve the plan.;Workload|The amount of work you have to do|My workload is very heavy this week.;Streamline|To make a process simpler and faster|We want to streamline our reporting process.;Initiative|The ability to act without being told|She showed great initiative on the project.;Onboarding|Helping a new employee settle into a job|Our onboarding takes about two weeks.",
study:"Semester|Half of an academic year|The new semester begins in September.;Assignment|A task given to a student|The assignment is due on Monday.;Citation|A note that shows the source of an idea|Add a citation for every quote.;Lecture|A talk given to students|The lecture was long but useful.;Thesis|A long piece of research writing|He is writing his thesis on solar energy.;Revision|Studying again before a test|Revision helps me remember the formulas.",
teaching:"Objective|The goal of a lesson|The objective of today's lesson is to practise questions.;Rubric|A guide that shows how work is marked|The rubric explains how I will grade your essay.;Differentiate|To adjust teaching for different learners|Good teachers differentiate their tasks.;Engage|To keep students interested|Games help to engage young learners.;Revise|To go over work again|Let us revise the new words together.;Behaviour|The way a person acts|Her behaviour in class has improved.",
interview:"Resume|A short document about your work and education|I updated my resume last night.;Vacancy|A job that is available|There is a vacancy in the finance team.;Shortlist|A small group of the best candidates|You are on the shortlist for the role.;Strength|A skill you are good at|My main strength is teamwork.;Onboard|To welcome and train a new employee|They will onboard me in my first week.;Reference|A person who says good things about you|My manager agreed to be my reference.",
everyday:"Appointment|A planned time to meet someone|I have a dentist appointment at noon.;Neighbour|A person who lives near you|My neighbour is very friendly.;Grocery|Food and items bought for the home|I need to buy some grocery items.;Reservation|A booking made in advance|I made a reservation for six people.;Invitation|A request to come to an event|Thank you for the invitation to dinner.;Schedule|A plan of times and events|My schedule is full on Friday.",
tech:"Software|Programs that run on a computer|We update our software every month.;Database|An organised store of data|The database holds all customer records.;Interface|The screen a user sees and uses|The new interface is very clear.;Latency|The delay before data arrives|High latency makes the video freeze.;Patch|A small update that fixes a problem|We released a patch this morning.;Framework|A ready set of tools for building software|This framework saves us a lot of time.",
"work/gen":"Colleague|A person you work with|My colleague helped me finish early.;Overtime|Extra hours worked after normal time|I did two hours of overtime today.;Supervisor|A person who manages your work|My supervisor approved my leave.;Promotion|A move to a higher job|She earned a promotion last year.;Briefing|A short meeting with key information|We have a briefing at nine.",
"work/it":"Repository|A place where code is stored|Push your changes to the repository.;Sprint|A short period of planned team work|Our sprint ends on Friday.;Rollback|Returning software to an earlier version|We did a rollback after the crash.;Ticket|A recorded task or problem|I closed the ticket this morning.;Pipeline|Automatic steps that build and test code|The pipeline failed on the last test.",
"work/teach":"Timetable|A table showing when lessons happen|The timetable changes next term.;Attendance|Being present at school|Attendance was high today.;Resources|Materials used for teaching|We need more resources for art class.;Progress|Improvement over time|The report shows good progress.;Syllabus|A list of topics in a course|The syllabus covers ten units.",
"work/cs":"Complaint|A statement that you are unhappy|We take every complaint seriously.;Apologise|To say sorry|I apologise for the delay.;Escalate|To pass a problem to a higher level|I will escalate this to my manager.;Resolve|To find a solution to a problem|We will resolve this today.;Warranty|A promise to repair a product|The phone is still under warranty.",
"work/hc":"Patient|A person who receives medical care|The patient is waiting in room two.;Symptom|A sign that you may be ill|Fever is a common symptom.;Prescription|A doctor's note for medicine|Here is your prescription.;Shift|A set period of work|I work the night shift this week.;Ward|A hospital room for patients|He was moved to the children's ward.",
"study/cs":"Algorithm|A set of steps to solve a problem|This algorithm sorts the list quickly.;Variable|A name that stores a value|Give the variable a clear name.;Compile|To turn code into a program|The code will not compile.;Query|A request for data|Run a query on the database.;Internship|A short period of work experience|I found an internship at a software firm.",
"study/bus":"Revenue|Money a company earns|Revenue grew by ten percent.;Profit|Money left after costs|The shop made a small profit.;Brand|A name and image for a product|A strong brand builds trust.;Invoice|A bill for goods or services|Please send the invoice today.;Market|People who might buy a product|The market for phones is huge.",
"study/med":"Diagnosis|Naming an illness after checking a patient|The diagnosis was clear.;Anatomy|The study of the body's structure|Anatomy is my favourite subject.;Treatment|Care given to cure an illness|The treatment lasts six weeks.;Dose|The amount of medicine to take|Take one dose after meals.;Ward round|A doctor's visit to each patient|The ward round starts at eight.",
"study/eng":"Prototype|A first working model|The team built a prototype.;Circuit|A path for electricity|The circuit is not working.;Measurement|A number that shows size or amount|Please check the measurement again.;Tolerance|The allowed difference in size|The part is within tolerance.;Sketch|A quick, simple drawing|Start with a rough sketch.",
"study/gen":"Major|The main subject of your degree|My major is economics.;Deadline|The last time to finish work|The deadline is next Friday.;Scholarship|Money given to help you study|She won a scholarship.;Campus|The grounds of a university|The campus is very green.;Elective|A subject you choose to study|I took art as an elective.",
"teaching/eng":"Pronunciation|The way a word is said|Her pronunciation is very clear.;Synonym|A word with a similar meaning|Big is a synonym of large.;Paragraph|A group of sentences about one idea|Write one paragraph about your day.;Fluent|Able to speak easily and well|He is fluent in English.;Dictation|Writing words that someone reads aloud|We practised dictation today.",
"teaching/math":"Fraction|A part of a whole number|One half is a fraction.;Equation|A statement that two things are equal|Solve the equation on the board.;Angle|The space between two lines|Measure the angle with a ruler.;Total|The sum of all parts|What is the total of these numbers?;Multiply|To add a number many times|Multiply six by seven.",
"teaching/sci":"Hypothesis|An idea you can test|Our hypothesis was correct.;Observe|To watch carefully|Observe the plant for a week.;Reaction|A change when substances mix|The reaction made bubbles.;Goggles|Glasses that protect your eyes|Wear goggles in the lab.;Habitat|The natural home of a living thing|A pond is a habitat for frogs.",
"teaching/cs":"Keyboard|A set of keys for typing|Use the keyboard to type your name.;Password|A secret word for logging in|Keep your password private.;Download|To copy a file from the internet|Download the worksheet first.;Browser|A program for viewing websites|Open the browser, please.;Folder|A place to store computer files|Save it in your folder.",
"teaching/gen":"Praise|Words that show approval|A little praise builds confidence.;Teamwork|Working well in a group|Teamwork made the project easy.;Excursion|A short trip for learning|The excursion is on Thursday.;Reward|Something given for good work|The winners get a small reward.;Permission|Approval to do something|Parents must give permission for the trip.",
"interview/gen":"Strength|Something you do very well|Patience is my biggest strength.;Challenge|A difficult task|I enjoy a good challenge.;Teamwork|Working well with others|My teamwork skills are strong.;Achievement|Something you did well|My top achievement was leading a project.;Goal|Something you want to achieve|My goal is to grow in this field.",
"interview/it":"Debug|To find and fix errors|I debug code every day.;Scalable|Able to grow without problems|We built a scalable system.;Architecture|The design of a system|I explained the system architecture.;Deploy|To release software|We deploy every Friday.;Trade-off|A choice between two good things|Every design has a trade-off.",
"interview/teach":"Philosophy|Your main beliefs about teaching|My philosophy is to inspire.;Lesson plan|A guide for one lesson|I wrote a lesson plan for the demo.;Assess|To judge what students know|I assess work every week.;Inclusive|Welcoming to everyone|I try to keep my class inclusive.;Mentor|To guide and support a person|I mentor new teachers.",
"interview/cs":"Patience|Staying calm when waiting or helping|Patience is key in this role.;Empathy|Understanding how others feel|Empathy helps with upset customers.;Satisfaction|A feeling of being happy with a service|Customer satisfaction comes first.;Rotating|Changing in a regular pattern|I can work rotating shifts.;Availability|When you are free to work|My availability is flexible.",
"interview/hc":"Confidentiality|Keeping private information safe|Confidentiality is vital in healthcare.;Compassion|Caring about another person's pain|Compassion guides my work.;Triage|Deciding who needs care first|Nurses do triage in the emergency room.;Protocol|An official set of steps|I always follow the protocol.;Handover|Passing patient information to the next shift|The handover takes ten minutes."
};
(function(){
  function rn(){return Math.random()-.5}
  function sh(a){return a.slice().sort(rn)}
  function parse(k){return(BANK[k]||"").split(";").filter(Boolean).map(function(x){return x.split("|")})}
  function wc(x){return x.split(/\s+/).length}
  // lift(u): keeps only the longer sentences (8+ words) and the longer words (7+ letters) of a unit.
  function lift(u){
    var keep=u.s.filter(function(x){return wc(x)>=8});
    if(keep.length<12){var rest=u.s.filter(function(x){return keep.indexOf(x)<0}).sort(function(a,b){return wc(b)-wc(a)});keep=u.s.filter(function(x){return keep.indexOf(x)>-1||rest.slice(0,12-keep.length).indexOf(x)>-1})}
    u.s=keep;
    var kw=u.w.filter(function(w){return w[0].length>=7});
    if(kw.length<4)kw=u.w.slice().sort(function(a,b){return b[0].length-a[0].length}).slice(0,4);
    u.w=kw;
  }
  // up(): upgrades one unit - lifts it, adds up to 5 new words from BANK, their example sentences and 2 new quiz questions.
  function up(u,idx,key){
    if(u.up||u.sec==="adv")return;
    lift(u);
    var have={};u.w.forEach(function(w){have[w[0].toLowerCase()]=1});
    var parts=key.split("/"),pool=parse(key);
    if(parts.length>1)pool=pool.concat(parse(parts[0]));
    var n=pool.length,added=[],i=0;
    while(added.length<5&&i<n){
      var e=pool[(idx*2+i)%n];i++;
      if(have[e[0].toLowerCase()])continue;
      have[e[0].toLowerCase()]=1;added.push(e);u.w.push(e);
    }
    added.forEach(function(e){if(u.s.indexOf(e[2])<0)u.s.push(e[2])});
    u.s.push("Can you tell me what "+(added[0]?added[0][0].toLowerCase():"this word")+" means?");
    var ws=u.w.map(function(w){return w[0]});
    function opts(c){var o=[c];sh(ws).forEach(function(x){if(o.length<3&&x!==c)o.push(x)});o=sh(o);return o}
    added.slice(0,2).forEach(function(e){
      var o1=opts(e[0]);u.q.push(['Which word means "'+e[1].toLowerCase()+'"?',o1,o1.indexOf(e[0])]);
    });
  }
  var counter={};
  // go(): works out the BANK key for a unit (section, or section/field) and calls up().
  function go(u){var parts=u.id.split("/"),key=parts.length>2?parts[0]+"/"+parts[1]:parts[0];counter[key]=(counter[key]||0)+1;up(u,counter[key],key)}
  BASE.forEach(go);
  for(var k in FIELDS)FIELDS[k].forEach(function(g){g.units.forEach(go)});
  // mkEs(): builds u.es = original sentences that do NOT contain this unit's words (so the first exercise does not give answers away).
  function mkEs(u){
    if(!u.es0)return;
    var st=u.w.map(function(w){return w[0].toLowerCase().slice(0,5)});
    var e=u.es0.filter(function(x){var l=x.toLowerCase();return!st.some(function(k){return l.indexOf(k)>-1})});
    u.es=e.length>=6?e:u.es0;
    u.shE=u.es.filter(function(x){return x.split(/\s+/).length<=6});
  }
  // mkSh(): builds u.sh = short sentences for the listening / speaking exercises.
  function mkSh(u){mkEs(u);
    var sh=(u.sh0||[]).concat(u.s.filter(function(x){return x.split(/\s+/).length<=6})),o=[];
    sh.forEach(function(x){if(o.indexOf(x)<0)o.push(x)});
    u.w.forEach(function(w){var x=w[0].toLowerCase();if(o.length<8)o.push("What does "+x+" mean?");if(o.length<12&&w[0].indexOf(" ")<0)o.push("Please explain "+x+" again.")});
    u.sh=o;
  }
  BASE.forEach(mkSh);for(var k2 in FIELDS)FIELDS[k2].forEach(function(g){g.units.forEach(mkSh)});
})();
