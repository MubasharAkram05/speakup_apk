/* ---- Work section: upgraded to B2-C1 ---- */
(function(){
// U maps a unit id to [sentences, words, quiz, chat] - the replacement B2-C1 content for the 5 Work units.
var U={
"work/meetings-and-deadlines":[["I suggest we review the agenda before we dive into the details.","Let us prioritise the action items that are already overdue.","Could we push the deadline back by a week without affecting the launch?","We need to manage expectations with the client before things escalate.","I will circulate the minutes once everyone has confirmed their tasks.","The scope of the project has expanded far beyond our original estimate.","If we miss this milestone, the entire timeline will be at risk.","I would like to flag a potential bottleneck in the approval process.","Let us table that discussion until we have more accurate figures.","Each owner should report any blockers before the end of the day.","We have reached a consensus, so let us move forward with the proposal.","Given the constraints, delivering on time is a realistic but tight target."],[["Milestone","An important stage in a project"],["Bottleneck","A point that slows down a whole process"],["Escalate","To pass a problem to a higher level"],["Consensus","General agreement among a group"],["Deliverable","A result that must be given to a client"],["Constraint","Something that limits what you can do"],["Overdue","Late and not yet completed"],["Stakeholder","A person affected by a project"]],[["Could we ___ the deadline back by a few days?",["push","pull","pass"],0],["The ___ of the project keeps growing.",["scope","scale","score"],0],["Let us ___ this issue to senior management.",["escalate","educate","elevate"],0],["We reached a ___ after a long discussion.",["consensus","consequence","contract"],0]],["We are behind schedule. What do you suggest?","Let us renegotiate the scope with the client.","Let us renegotiate the scope with the moon."]],
"work/writing-emails":[["I am writing to follow up on the proposal we discussed last week.","Please find attached the revised contract for your review and approval.","I would appreciate your confirmation at your earliest convenience.","Unfortunately, we are unable to meet the original delivery date.","Thank you for bringing this matter to our attention so promptly.","I apologise for any inconvenience this delay may have caused you.","Should you require any further clarification, please do not hesitate to contact me.","I am copying in my colleague, who will handle the technical details.","Following our conversation, I would like to summarise the agreed next steps.","I regret to inform you that your application was unsuccessful on this occasion.","Could you kindly confirm whether the figures below are accurate?","I look forward to continuing our cooperation in the coming months."],[["Clarification","An explanation that removes confusion"],["Convenience","Ease and suitability for your needs"],["Regarding","About, used in formal writing"],["Acknowledge","To confirm that you received something"],["Proposal","A formal plan or suggestion"],["Reminder","A message that helps you remember"],["Confidential","Meant to be kept secret"],["Correspondence","Letters or emails sent between people"]],[["I am writing ___ your recent proposal.",["regarding","regards","regarded"],0],["Please ___ receipt of this email.",["acknowledge","achieve","accept"],0],["This information is strictly ___.",["confidential","confident","confused"],0],["I would be ___ if you could reply by Friday.",["grateful","grateless","gratify"],0]],["Did you get my email about the contract?","Yes, I will send you my feedback by tomorrow.","Yes, I will send you my feedback by dragon mail."]],
"work/giving-presentations":[["Today I will walk you through our results and outline the next steps.","As the chart illustrates, revenue grew steadily throughout the second half.","This brings me to my main argument, which challenges the current approach.","Let me draw your attention to a worrying trend in customer retention.","What these figures reveal is a clear gap between demand and supply.","To put this into perspective, our costs have doubled in two years.","I would like to build on what my colleague just mentioned.","Before I wrap up, let me recap the three key takeaways.","That is a fair question, and I will address it in a moment.","If you look closely, you will notice a slight dip in March.","The implications of this finding are significant for our long-term strategy.","I would welcome any questions or challenges to the points I have raised."],[["Illustrate","To show or explain with an example"],["Retention","Keeping customers or employees over time"],["Implication","A possible future effect or result"],["Recap","To repeat the main points briefly"],["Perspective","A way of looking at something"],["Takeaway","The main lesson from a talk"],["Trajectory","The path of development over time"],["Elaborate","To give more details about something"]],[["Let me ___ the main points before I finish.",["recap","recall","reduce"],0],["This chart ___ the growth of our sales.",["illustrates","illuminates","imitates"],0],["Could you ___ on that last point?",["elaborate","eliminate","emphasise"],0],["The ___ of this result is very important.",["implication","imitation","invitation"],0]],["Could you explain that last slide in more detail?","Certainly. It shows how retention has changed since January.","Certainly. It shows how my sandwich has changed since January."]],
"work/phone-calls-and-messages":[["I am calling regarding the invoice that was issued last month.","Could you please put me through to someone in the finance department?","I am afraid the line is breaking up, so could you repeat that?","Let me check the details and call you back within the hour.","I would like to arrange a conference call with all regional managers.","Please leave your name and number, and we will return your call.","Could I take a message, or would you prefer to call back later?","I am returning your call from earlier this morning.","Sorry to interrupt, but there seems to be a problem with the connection.","I will follow this up in writing so that we have a record.","We need to reschedule the call because several participants cannot attend.","Thank you for your patience while I looked into this matter for you."],[["Invoice","A bill listing goods or services provided"],["Reschedule","To change the time of a planned event"],["Participant","A person who takes part in an event"],["Voicemail","A recorded message left on a phone"],["Switchboard","A system that connects incoming calls"],["Follow up","To take further action after contact"],["Connection","A link between phones or computers"],["Inquiry","A question asking for information"]],[["Could you ___ me through to the manager?",["put","push","pull"],0],["The line is ___ up, I cannot hear you.",["breaking","making","taking"],0],["I will ___ you back in ten minutes.",["call","hold","keep"],0],["We had to ___ the meeting for next week.",["reschedule","rewind","resist"],0]],["Can you hear me clearly?","Not really, the line keeps breaking up.","Not really, the line keeps eating pizza."]],
"work/teamwork-and-projects":[["We should delegate the routine tasks and focus on the strategic ones.","Her contribution was vital in getting the project back on track.","Let us hold a retrospective to learn from what went wrong.","Clear communication is the foundation of any successful collaboration.","We need to align our priorities before the next sprint begins.","I take full responsibility for the mistake and will fix it today.","The team has been working under tremendous pressure for several weeks.","Constructive criticism helps us improve without damaging morale.","He tends to take initiative rather than waiting to be told what to do.","Cross-functional teams often produce more creative and practical solutions.","We have to balance quality with the limited time and budget available.","Recognising each other's efforts keeps the whole team motivated."],[["Delegate","To give a task to someone else"],["Initiative","The ability to act without being told"],["Morale","The confidence and spirit of a group"],["Constructive","Helpful and aimed at improvement"],["Cross-functional","Involving people from different departments"],["Accountability","Being responsible for your actions and results"],["Retrospective","A review of what happened in a project"],["Collaboration","Working together toward a common goal"]],[["A good manager knows when to ___ tasks.",["delegate","decorate","deliver"],0],["Their ___ was low after the long delay.",["morale","moral","mural"],0],["She gave ___ feedback that really helped me.",["constructive","constant","conservative"],0],["Everyone must take ___ for their own work.",["accountability","accessibility","availability"],0]],["How is the team handling the pressure?","They are coping well, and morale is still high.","They are coping well, and the printer is dancing."]]
};
// Replaces the old content of each Work unit with the upgraded content and sets up:1.
BASE.forEach(function(u){var r=U[u.id];if(r){u.s=r[0];u.w=r[1];u.q=r[2];u.ch=r[3];u.up=1}});
})();
// LEVEL: Work field lessons (General office, IT) = Intermediate, B1-B2.
/* ---- Work field lessons: intermediate level (B1-B2), first 6 sentences use no hard words ---- */
(function(){
// U maps a field unit id to its B1-B2 content: [sentences, words, quiz, chat].
var U={
"work/gen/office-small-talk":[["How was your weekend, and did you manage to rest a little?","I took the earlier train today because the roads were so busy.","Do you fancy getting some lunch together after the morning meeting?","I heard the new coffee place nearby is really worth trying.","We should catch up properly when things are less hectic this week.","It looks like the weather will improve by the end of the week.","My commute takes almost an hour, so I usually listen to podcasts.","The atmosphere in our office is quite casual and very friendly.","I get along well with my colleagues, especially those in my team.","It felt a bit awkward when I forgot my manager's name today.","Our cafeteria is reliable, although the menu rarely changes.","I am thinking of asking whether we can relocate to a quieter desk."],[["Commute","The daily trip between home and work"],["Casual","Relaxed and not formal"],["Colleague","A person you work with"],["Awkward","Uncomfortable or embarrassing"],["Cafeteria","A place in a building where staff can eat"],["Reliable","Able to be trusted to do what is expected"],["Relocate","To move to a different place"]],[["My ___ to work takes about forty minutes.",["commute","comment","comfort"],0],["Everyone dresses in a ___ way on Fridays.",["casual","causal","casualty"],0],["I find it ___ when I cannot remember someone's name.",["awkward","backward","forward"],0],["Our ___ serves hot meals every day.",["cafeteria","calendar","category"],0]],["Did you have a good weekend?","Yes, I visited some friends and relaxed a lot.","Yes, I visited some friends and relaxed on the ceiling."]],
"work/gen/salary-and-time-off":[["Could you tell me how many days of annual leave I have left?","I would like to take a week off in the middle of next month.","When does the company usually pay salaries each month?","Do you think I could ask my manager about a raise soon?","I need to book a doctor's appointment, so I may leave early.","I will let my team know before I go on holiday.","My payslip shows a deduction that I do not completely understand.","I am entitled to twenty days of paid leave every year.","The company offers a generous bonus when we reach our targets.","If I work extra hours, I should receive overtime payment.","I submitted my leave request, but it still needs approval.","My contract states that I must give a month's notice before resigning."],[["Payslip","A document showing your pay and deductions"],["Deduction","An amount taken away from your salary"],["Entitled","Having the right to receive something"],["Bonus","Extra money paid for good results"],["Overtime","Extra hours worked after normal time"],["Approval","Official permission for something"],["Resign","To officially leave your job"]],[["My ___ shows how much tax I have paid.",["payslip","paycheck","payment"],0],["Employees are ___ to paid holiday.",["entitled","enabled","engaged"],0],["I received a ___ for finishing the project early.",["bonus","bonding","border"],0],["She decided to ___ and start her own business.",["resign","resist","resolve"],0]],["Can I take next Friday off?","Yes, as long as your work is covered.","Yes, as long as your shoes are covered."]],
"work/gen/giving-and-taking-feedback":[["Thanks for your report, I think it was clear and well organised.","Could we talk about how the last project went for you?","I appreciate your honesty, and I will think about what you said.","Do you have any suggestions on how I could do better next time?","I felt a little disappointed, but I understand your point.","Please tell me if there is anything I should change.","You handled that difficult client very professionally, and I was impressed.","One area for improvement is meeting deadlines more consistently.","I would like to give you some constructive feedback on your presentation.","Try to see criticism as a chance to improve rather than a personal attack.","Your performance review is scheduled for the end of the month.","I will work on my weaknesses and set clear goals for the next quarter."],[["Feedback","Comments about how well someone is doing"],["Improvement","A change that makes something better"],["Constructive","Helpful and meant to improve something"],["Criticism","Comments about what is wrong with something"],["Performance","How well someone does their job"],["Impressed","Feeling admiration for something"],["Consistent","Always behaving or performing in the same way"]],[["She gave me ___ feedback on my report.",["constructive","construction","constant"],0],["My ___ review is next Tuesday.",["performance","performer","perform"],0],["I was ___ by how quickly he learned.",["impressed","pressed","depressed"],0],["We need to be more ___ in our quality.",["consistent","considerate","convenient"],0]],["What did you think of my presentation?","It was good, but you could slow down a little.","It was good, but you could fly down a little."]],
"work/gen/solving-workplace-problems":[["We have a small problem with the schedule, so can we talk?","I think the best way forward is to listen to both sides.","Let us find a solution that works for everyone involved.","Could you explain exactly what happened before the meeting?","I am sorry about the mistake, and I will correct it today.","If we cannot agree, we can ask our manager for advice.","There seems to be a misunderstanding about who is responsible for this task.","We should identify the root cause instead of blaming each other.","I suggest we compromise by sharing the workload more fairly.","The conflict between the two teams is slowing down the whole project.","Let us brainstorm a few options and then choose the most practical one.","It is important to stay calm and professional when tensions are high."],[["Misunderstanding","A failure to understand something correctly"],["Responsible","Having a duty to deal with something"],["Compromise","An agreement where both sides give up something"],["Conflict","A serious disagreement between people"],["Practical","Likely to work in real situations"],["Tension","A feeling of stress between people"],["Identify","To find and recognise something"]],[["We reached a ___ after a long discussion.",["compromise","comparison","competition"],0],["There was a ___ about the delivery date.",["misunderstanding","misfortune","mistake"],0],["Let us ___ the real cause of the problem.",["identify","identity","ignore"],0],["The ___ in the room was easy to feel.",["tension","attention","intention"],0]],["How should we solve this problem?","Let us listen to both sides and find a fair solution.","Let us listen to both walls and find a fair banana."]],
"work/it/daily-standup-and-tasks":[["Good morning, everyone, shall we start with yesterday's updates?","I finished the login page, and today I will test it.","I am waiting for a reply from the design team.","Does anyone need help with their tasks this morning?","I will take that task, because I have some free time today.","Let us keep the meeting short so we can start working.","I am blocked on the database task until I get access.","Our sprint ends on Friday, so we need to prioritise carefully.","I have updated the ticket and moved it to the review column.","The estimate for this feature is three days, including testing.","Let us break this large task into smaller, manageable pieces.","Please add your progress to the shared board before lunch."],[["Update","A report of the latest progress"],["Blocked","Unable to continue because of a problem"],["Sprint","A short period of planned team work"],["Ticket","A recorded task or problem in a system"],["Estimate","A guess of how long or costly something is"],["Manageable","Easy enough to deal with"],["Priority","Something that is more important than others"]],[["I am ___ until I get the right access.",["blocked","blocking","block"],0],["Our ___ finishes next Friday.",["sprint","spring","spirit"],0],["Can you give me an ___ for this task?",["estimate","estimation","estate"],0],["Fixing the login error is our top ___.",["priority","privacy","private"],0]],["What are you working on today?","I am finishing the login page and then testing it.","I am finishing the login page and then eating it."]],
"work/it/bugs-and-fixes":[["The app closes by itself when I press the save button.","Can you tell me what you did before the error appeared?","I tried to restart it, but the problem is still there.","Let me check the error message on my screen.","I think I found the problem, and I will fix it now.","Please test it again and tell me if it works.","I cannot reproduce the bug on my computer, so I need more details.","The crash happens only when the user enters a very long name.","I will write a quick patch and deploy it to the test server.","This bug is critical because it affects all paying customers.","After checking the logs, I realised the database connection was timing out.","We should add a test so that this issue never happens again."],[["Reproduce","To make a problem happen again on purpose"],["Critical","Extremely important or serious"],["Patch","A small update that fixes a problem"],["Timeout","A failure because something took too long"],["Affect","To have an effect on something"],["Regression","A new problem in something that worked before"],["Workaround","A temporary way to avoid a problem"]],[["I cannot ___ the bug on my machine.",["reproduce","produce","reduce"],0],["This is a ___ error, so please fix it today.",["critical","critic","criticise"],0],["We released a ___ this morning.",["patch","path","pitch"],0],["Use this ___ until we find a permanent fix.",["workaround","workload","workshop"],0]],["Did you find the cause of the crash?","Yes, the database connection was timing out.","Yes, the database connection was wearing shoes."]],
"work/it/code-review-and-teamwork":[["Could you take a look at my pull request when you have time?","Thanks for the review, I will fix those comments today.","I left a few suggestions, but the overall code looks good.","Please add a short comment so others understand this function.","I would rename this variable so its purpose is clearer.","Let us talk about it together instead of arguing in the comments.","This function is too long, so I suggest splitting it into smaller parts.","Your solution works, although it may be slow with large amounts of data.","Please follow the team's coding standards to keep everything consistent.","I approved the changes, but please resolve the minor issues before merging.","Pair programming helped us catch several errors that tests had missed.","Good documentation saves new team members a lot of time."],[["Review","To check someone's work carefully"],["Rename","To give something a new name"],["Standard","A rule or level of quality to follow"],["Merge","To combine changes into one version"],["Documentation","Written information explaining how something works"],["Maintain","To keep something in good condition"],["Readable","Easy to read and understand"]],[["Could you ___ my code before the release?",["review","revise","reveal"],0],["Please ___ the branch after the tests pass.",["merge","marge","mercy"],0],["Clear names make the code more ___.",["readable","reliable","regular"],0],["Good ___ helps new developers learn faster.",["documentation","documents","documentary"],0]],["Can you review my code today?","Sure, I will leave my comments this afternoon.","Sure, I will leave my comments on the moon."]],
"work/it/deployments-and-incidents":[["We plan to release the new version on Thursday evening.","Please let me know when the update is ready to go.","The website went down, so we are looking into it now.","Can you tell me when the service started failing?","We fixed the issue, and everything is working again.","I will write a short report about what happened.","If the release causes problems, we will roll back immediately.","The monitoring tool sent an alert at three o'clock this morning.","We need to inform the customers about the outage as soon as possible.","The root cause was a configuration error in the production environment.","After the incident, we held a review to prevent it from happening again.","Please keep a record of every step you take during the deployment."],[["Release","To make a new version available"],["Roll back","To return to an earlier version"],["Outage","A period when a service does not work"],["Alert","A warning message about a problem"],["Incident","An unexpected event that causes problems"],["Environment","The setup where software runs"],["Configuration","The settings that control how software works"]],[["We had a short ___ last night.",["outage","outside","outline"],0],["The system sent an ___ when the server stopped.",["alert","alarm clock","alter"],0],["If something breaks, we will ___ the release.",["roll back","roll over","roll up"],0],["The error was caused by a wrong ___.",["configuration","conversation","connection"],0]],["What happened to the website?","The server stopped, but we fixed it quickly.","The server stopped, because it wanted a holiday."]]
};
// Replaces field-unit content with the Intermediate content, sets up:1 and keeps the first 6 easy sentences as u.es0.
for(var k in FIELDS)FIELDS[k].forEach(function(g){g.units.forEach(function(u){var r=U[u.id];if(r){u.s=r[0];u.w=r[1];u.q=r[2];u.ch=r[3];u.up=1;u.es0=r[0].slice(0,6)}})});
})();
// LEVEL: Study section (5 base units + 5 fields x 4 units = 25 units) = Intermediate, B1-B2.
/* ---- Study section: intermediate level (B1-B2) ----
   HOW THIS BLOCK WORKS
   - U maps a unit id to its new content: [ sentences, words, quiz, chat ].
       sentences : 12 sentences. The first 6 are easy (B1, no hard words, they are used
                   for the first exercise "es0"). Sentences 7-12 are B2 and contain the unit words.
       words     : 7 items [word, meaning]. Every word appears inside one of the sentences,
                   so the Today / Vocabulary cards can show it in an example.
       quiz      : 4 questions [question, [3 options], index of the right option].
       chat      : [question, right answer, silly answer].
   - At the end of the block the new content replaces the old content of every Study unit.
     "up:1" tells the ENRICHMENT step below to leave these units alone.
   - Study units live in two places:
       BASE         -> 5 general Study units (Campus, Exams, Group, Library, Professor)
       FIELDS.study -> 5 fields: Computer science, Business, Medicine, Engineering, Other degree
*/
(function(){
var U={

/* ===================== BASE UNITS (general Study) ===================== */

// ---- Study 1: Campus and courses ----
"study/campus-and-courses":[
 [ // sentences
  "Where can I find the main office of the university?",
  "I am new here, so could you show me around the campus?",
  "Which classes are you taking this year?",
  "The first lesson starts at nine and ends at ten thirty.",
  "I would like to talk to my adviser about my timetable.",
  "Do you know how many students are in this course?",
  "I need to register for three courses before the end of this week.",
  "The tuition is quite high, so I am applying for financial help.",
  "You must pass the introduction course, because it is a prerequisite for this one.",
  "Each semester I try to choose one elective that is different from my main subject.",
  "The syllabus explains what we will study and how the final grade is calculated.",
  "I still need ten more credits to finish my degree on time."
 ],
 [ // words
  ["Register","To officially put your name on a course"],
  ["Tuition","Money you pay for your teaching"],
  ["Prerequisite","Something you must have before you can take a course"],
  ["Semester","Half of the academic year"],
  ["Syllabus","A list of the topics in a course"],
  ["Elective","A subject that you choose yourself"],
  ["Credits","Points that count towards finishing your degree"]
 ],
 [ // quiz
  ["I am thinking of ___ for a scholarship next month.",["apply","applying","to applying"],1],
  ["You cannot join this course ___ you pass the basic exam first.",["unless","although","while"],0],
  ["I wish I ___ more time to choose my classes.",["have","had","will have"],1],
  ["Neither of my classes ___ on Friday.",["meet","meets","are meeting"],1]
 ],
 ["Have you registered for next semester yet?","Not yet, I am waiting for my adviser to approve my choices.","Not yet, I am waiting for my toaster to approve my choices."] // chat
],

// ---- Study 2: Study and exams ----
"study/study-and-exams":[
 [
  "I have a big test tomorrow, so I am a little nervous.",
  "How many hours do you study every day?",
  "I usually read my notes before I go to bed.",
  "It is hard to work when my phone keeps buzzing.",
  "Taking short breaks helps me remember more.",
  "I always make a plan before my exams start.",
  "I need to revise three chapters tonight, and studying all day is exhausting.",
  "It is difficult to concentrate when the library is crowded and noisy.",
  "She stays motivated because she has clear goals for every month.",
  "My phone is the biggest distraction, so I leave it in another room.",
  "Being consistent is better than studying for ten hours the night before the exam.",
  "I was very nervous at first, but I managed to overcome my fear during the oral exam."
 ],
 [
  ["Revise","To study again what you learned before a test"],
  ["Concentrate","To focus all your attention on one thing"],
  ["Exhausting","Making you feel extremely tired"],
  ["Motivated","Having a strong reason to keep trying"],
  ["Distraction","Something that stops you from paying attention"],
  ["Consistent","Doing something in the same good way every time"],
  ["Overcome","To succeed in dealing with a problem"]
 ],
 [
  ["If I ___ earlier, I would not be so tired now.",["start","started","had started"],2],
  ["I suggest ___ a study group with your classmates.",["to form","forming","form"],1],
  ["She has been studying English ___ three years.",["since","for","during"],1],
  ["He was ___ tired to keep his eyes open.",["too","so","very"],0]
 ],
 ["You look tired. Did you stay up studying?","Yes, I had to finish an assignment before midnight.","Yes, I had to finish an assignment before the moon woke up."]
],

// ---- Study 3: Group projects ----
"study/group-projects":[
 [
  "Let us start the project today.",
  "Who wants to write the first part?",
  "When is everyone free to meet this week?",
  "I can do the research and find some pictures.",
  "Can we meet in the library after class?",
  "I think we worked well together as a team.",
  "Everyone should contribute equally, so let us divide the work fairly.",
  "We need to finish the first draft before Friday.",
  "I disagree with that idea, but I understand your point of view.",
  "If we cannot agree, we will find a compromise that works for everyone.",
  "Each member takes responsibility for their own part of the report.",
  "The deadline is next Monday, so please send me your section by Saturday."
 ],
 [
  ["Contribute","To give your part to a shared task"],
  ["Divide","To split something into smaller parts"],
  ["Draft","A first version of a piece of writing"],
  ["Disagree","To have a different opinion from someone"],
  ["Compromise","An agreement where each side gives up something"],
  ["Responsibility","A duty to take care of something"],
  ["Deadline","The last time by which work must be finished"]
 ],
 [
  ["Can we ___ the tasks equally between us?",["splitting","split","splits"],1],
  ["I am sorry, I ___ my part yet.",["did not finish","have not finished","am not finishing"],1],
  ["If everyone ___ on time, we will finish early.",["arrive","arrives","will arrive"],1],
  ["She suggested ___ the presentation twice before the day.",["practise","practising","to practise"],1]
 ],
 ["Can you finish your part by Friday?","Yes, I can finish it by Thursday evening.","Yes, I can finish it before my cat learns to fly."]
],

// ---- Study 4: Library and research ----
"study/library-and-research":[
 [
  "Where can I find books about history?",
  "I would like to take this book home, please.",
  "How long can I keep it?",
  "The library closes at eight tonight.",
  "Please keep your voice down in the quiet room.",
  "Could you tell me where the printer is?",
  "You can borrow up to five books for two weeks with your student card.",
  "I found three useful sources, but one of them is quite old.",
  "I searched the online database for articles written by experts.",
  "Every journal article in your essay needs a proper reference at the end.",
  "Copying someone else's work without saying so is called plagiarism.",
  "Please add a citation each time you use another writer's idea."
 ],
 [
  ["Borrow","To take something and bring it back later"],
  ["Source","A book, article or person that gives you information"],
  ["Database","A large collection of information stored on a computer"],
  ["Journal","A magazine with serious articles by experts"],
  ["Reference","Details that show where you found some information"],
  ["Plagiarism","Using someone else's work as if it were your own"],
  ["Citation","A short note that shows where an idea came from"]
 ],
 [
  ["I need to ___ these books to the library by Friday.",["returning","returned","return"],2],
  ["This article was ___ by two famous researchers.",["write","wrote","written"],2],
  ["I would rather ___ at home than in the library.",["study","studying","to study"],0],
  ["Not only ___ the book useful, but it was also easy to read.",["was","is it","did"],0]
 ],
 ["Excuse me, can I borrow this book?","Yes, you can keep it for two weeks.","Yes, you can keep it until the books grow legs."]
],

// ---- Study 5: Talking to your professor ----
"study/talking-to-your-professor":[
 [
  "Excuse me, do you have a moment?",
  "Thank you for seeing me today.",
  "I have a question about the homework.",
  "When are your office hours this week?",
  "I was ill last week, so I could not finish on time.",
  "I did not understand the last part of the lecture.",
  "Could I ask for a short extension on my essay, please?",
  "I would be grateful for any feedback on my first draft.",
  "Would you be able to write a recommendation letter for my application?",
  "I would like to make an appointment to discuss my results.",
  "Could you clarify what you expect in the conclusion?",
  "My supervisor suggested that I meet you before submitting the final version."
 ],
 [
  ["Extension","More time to finish your work"],
  ["Grateful","Feeling thankful for something kind"],
  ["Feedback","Comments that help you improve your work"],
  ["Recommendation","A letter that says good things about you"],
  ["Appointment","A planned time to meet someone"],
  ["Clarify","To make something easier to understand"],
  ["Supervisor","A person who guides and checks your work"]
 ],
 [
  ["I am writing ___ ask about the deadline.",["to","for","at"],0],
  ["Would you mind ___ me some feedback?",["give","giving","to give"],1],
  ["I would be grateful if you ___ me more time.",["give","could give","gave to"],1],
  ["I am sorry for ___ late, the bus broke down.",["be","being","been"],1]
 ],
 ["Do you need more time for your essay?","Yes, I would like two more days, please.","Yes, I would like two more days, and a pet dragon."]
],

/* ===================== FIELD: Computer science and IT ===================== */

// ---- CS 1: Programming classes ----
"study/cs/programming-classes":[
 [
  "I have a programming class at nine today.",
  "Our lab is in the computer room downstairs.",
  "Which language are we using for this task?",
  "I wrote my first program last week.",
  "Could you help me find the mistake in my code?",
  "I forgot to save my file before the lab ended.",
  "The program will not compile because of a syntax error on line ten.",
  "I spent two hours trying to debug a single line of code.",
  "A variable stores a value that can change while the program runs.",
  "This function takes two numbers and returns their sum.",
  "The loop repeats the same steps until the list is empty.",
  "Please comment your code clearly before you submit it on Friday."
 ],
 [
  ["Compile","To turn code into a program the computer can run"],
  ["Syntax","The rules for how code must be written"],
  ["Debug","To find and fix mistakes in code"],
  ["Variable","A named place that stores a value"],
  ["Function","A block of code that does one job"],
  ["Loop","A set of steps that repeats"],
  ["Submit","To hand in your work for marking"]
 ],
 [
  ["The program does not run ___ it has a syntax error.",["because","so","although"],0],
  ["I have ___ this bug for two hours, but I still cannot find it.",["look at","been looking for","looked"],1],
  ["Our teacher asked us ___ the code before submitting it.",["test","testing","to test"],2],
  ["If I ___ the error earlier, I would have saved time.",["find","found","had found"],2]
 ],
 ["Did you finish the programming assignment yet?","Yes, I finished it and submitted it last night.","Yes, I finished it and then my laptop flew to the moon."]
],

// ---- CS 2: Algorithms and data ----
"study/cs/algorithms-and-data":[
 [
  "Today we learned how to put numbers in order.",
  "How does this method work?",
  "First, I compare two numbers next to each other.",
  "If the first one is bigger, I swap them.",
  "The program takes longer when the list gets bigger.",
  "Could you explain each step to me again?",
  "An algorithm is a clear set of steps for solving a problem.",
  "An array stores items in order, and each item has an index.",
  "A stack follows the rule last in, first out.",
  "Binary search is far more efficient than checking every item one by one.",
  "With recursion, a function calls itself to solve a smaller version of the problem.",
  "We measure the complexity of an algorithm by how its running time grows with the input."
 ],
 [
  ["Algorithm","A set of steps for solving a problem"],
  ["Array","A list of items stored in order"],
  ["Index","The number that shows the position of an item"],
  ["Stack","A collection where the last item added leaves first"],
  ["Efficient","Working well without wasting time or memory"],
  ["Recursion","When a function calls itself to solve smaller parts"],
  ["Complexity","How much time or memory a program needs as it grows"]
 ],
 [
  ["Binary search is much ___ than checking every item.",["fast","faster","fastest"],1],
  ["A function that calls ___ is called recursive.",["it","itself","its"],1],
  ["The program ___ longer when the list gets bigger.",["take","takes","taking"],1],
  ["I would have used a stack if I ___ the problem better.",["understood","had understood","understand"],1]
 ],
 ["Can you explain how your sorting algorithm works?","Sure, first I compare two numbers and swap them.","Sure, first I compare two numbers and then ask a penguin."]
],

// ---- CS 3: Databases and networks ----
"study/cs/databases-and-networks":[
 [
  "The website is very slow today.",
  "Why does the internet keep stopping?",
  "We must use strong passwords to keep our data safe.",
  "Please save a copy of the files before you delete anything.",
  "Sara plans the tables, and I build the website.",
  "We will test the whole system before the final talk.",
  "A database stores information in tables with rows and columns.",
  "I wrote a query to find all the customers who live in Lahore.",
  "The server was down, so nobody could open the website.",
  "A protocol is a set of rules that computers follow when they send data.",
  "It is important to encrypt passwords so that hackers cannot read them.",
  "The firewall blocks dangerous traffic, but a low bandwidth can still slow the network."
 ],
 [
  ["Database","An organised collection of data on a computer"],
  ["Query","A request for information from a database"],
  ["Server","A computer that sends data to other computers"],
  ["Protocol","A set of rules for sending data"],
  ["Encrypt","To change data into a secret code"],
  ["Firewall","A tool that blocks dangerous traffic"],
  ["Bandwidth","The amount of data a connection can carry"]
 ],
 [
  ["We use encryption so that nobody ___ read our messages.",["can","cans","could to"],0],
  ["The website did not open ___ the server was down.",["because","so","but"],0],
  ["Our data ___ every night to a secure server.",["backs up","is backed up","has backing up"],1],
  ["I wish the network ___ faster at home.",["is","were","will be"],1]
 ],
 ["Why is the website so slow today?","I think the server is busy, so we should wait.","I think the server is busy, because it is eating pizza."]
],

// ---- CS 4: Internships and tech careers ----
"study/cs/internships-and-tech-careers":[
 [
  "I want to work at a software company next summer.",
  "Could you check my CV before I send it?",
  "What do you need to know for this job?",
  "I am good at Python, and I am learning JavaScript.",
  "Today is my first day, and I am a little nervous.",
  "Could you show me where I can put my laptop?",
  "I am applying for a summer internship at a software company.",
  "My portfolio shows three projects that I built at university.",
  "My mentor reviews my code every Friday and gives me honest advice.",
  "I updated my resume and added my technical skills.",
  "She works as a developer, and she has two years of experience in web design.",
  "After the internship, I hope to get a full-time job with the same team."
 ],
 [
  ["Internship","A short job where students learn real work"],
  ["Portfolio","A collection of your best work to show employers"],
  ["Mentor","An experienced person who gives you advice"],
  ["Resume","A short document about your work and education"],
  ["Skills","Abilities that you have learned"],
  ["Developer","A person who writes and builds software"],
  ["Experience","Knowledge you get from doing a job"]
 ],
 [
  ["I am looking forward to ___ my internship next week.",["start","starting","started"],1],
  ["She has worked as a developer ___ 2022.",["for","since","during"],1],
  ["The company offered me the job ___ I had no experience.",["although","because","unless"],0],
  ["By next year, I ___ my first full-time job.",["will find","will have found","find"],1]
 ],
 ["Tell me about yourself and your projects.","I study computer science, and I enjoy building small apps.","I study computer science, and I enjoy teaching cats to code."]
],

/* ===================== FIELD: Business ===================== */

// ---- Business 1: Marketing basics ----
"study/bus/marketing-basics":[
 [
  "Our buyers are mostly young people who shop online.",
  "We need to know what people want.",
  "How much money do we have for ads?",
  "Social media is the cheapest way to reach students.",
  "Let us post a short video and ask people to share it.",
  "After this work, I will write a report on the results.",
  "Our logo and colours help people remember the brand.",
  "The campaign starts next month, so we must prepare now.",
  "Who is our target audience, and where do they spend their time?",
  "I will design a short survey for market research.",
  "We should compare our prices with those of our main competitor.",
  "We hired an influencer to promote the new product to our customers."
 ],
 [
  ["Brand","A name and image that make a product known"],
  ["Campaign","A planned set of actions to promote a product"],
  ["Target","The group of people you want to reach"],
  ["Survey","A list of questions used to collect opinions"],
  ["Competitor","A company that sells similar products to yours"],
  ["Promote","To make people know about a product"],
  ["Customer","A person who buys goods or services"]
 ],
 [
  ["Our advertising budget is ___ than last year.",["small","smaller","smallest"],1],
  ["We use social media ___ our new product.",["promote","to promote","promoting"],1],
  ["If sales ___ next month, we will lower the price.",["fall","will fall","fell"],0],
  ["The campaign ___ by a famous designer last year.",["created","was created","has created"],1]
 ],
 ["Who is the target customer for this product?","Our target customer is a young student who likes saving money.","Our target customer is a young robot who likes drinking soup."]
],

// ---- Business 2: Accounting and finance ----
"study/bus/accounting-and-finance":[
 [
  "I need to check how much money we have this month.",
  "Unfortunately, we lost money in the second quarter.",
  "Could you send me the bill by Friday?",
  "Please keep every paper that shows what we paid.",
  "Can we afford to hire another person right now?",
  "I will update the sheet and send the report tomorrow.",
  "The budget for next year must be approved by the manager.",
  "Our profit was higher than last year because we reduced our costs.",
  "Please send the invoice to the customer by the end of the week.",
  "What is the difference between revenue and profit?",
  "Rent is our biggest monthly expense, and cash flow is a problem when customers pay late.",
  "The accountant prepares the financial report at the end of every year."
 ],
 [
  ["Budget","A plan for how much money to spend"],
  ["Profit","The money left after paying all costs"],
  ["Invoice","A bill that asks a customer to pay"],
  ["Revenue","The total money a company earns from sales"],
  ["Expense","Money that a business spends on something"],
  ["Cash flow","The money moving in and out of a business"],
  ["Accountant","A person who keeps and checks financial records"]
 ],
 [
  ["We made a ___ because our costs were higher than our sales.",["loss","lose","lost"],0],
  ["Please pay the invoice ___ thirty days.",["within","during","until"],0],
  ["Our income is greater ___ our expenses this quarter.",["than","then","that"],0],
  ["If we ___ costs, profit will increase.",["reduce","reduced","will reduce"],0]
 ],
 ["Why is our cash flow so low this month?","Many customers have not paid yet, so we must remind them.","Many customers have not paid yet, because they bought a hundred ducks."]
],

// ---- Business 3: Management and teamwork ----
"study/bus/management-and-teamwork":[
 [
  "A good boss listens to the whole team.",
  "Our weekly meeting starts at ten o'clock.",
  "Please send the plan before the meeting begins.",
  "Thank you all for your hard work on this project.",
  "Do you feel you have enough support from your manager?",
  "Let us talk calmly and listen to each side.",
  "A strong leader knows how to motivate people with clear goals.",
  "I will delegate the report to Sara this week.",
  "What is our strategy for the next year?",
  "We need to solve this conflict between two colleagues before it grows.",
  "Good feedback helps employees improve and feel valued.",
  "Please check the agenda and send me any extra points today."
 ],
 [
  ["Leader","A person who guides and directs a group"],
  ["Motivate","To make someone want to work hard"],
  ["Delegate","To give a task to someone else"],
  ["Strategy","A long-term plan to reach a goal"],
  ["Conflict","A serious disagreement between people"],
  ["Feedback","Comments that help people improve"],
  ["Agenda","A list of topics for a meeting"]
 ],
 [
  ["A good manager should ___ tasks to the team.",["delegates","delegating","delegate"],2],
  ["We need to ___ this conflict before it gets worse.",["solve","solves","solving"],0],
  ["The manager ___ a meeting every Monday morning.",["hold","holds","holding"],1],
  ["She asked me ___ the agenda to everyone.",["send","sending","to send"],2]
 ],
 ["Two team members are arguing again. What should we do?","I will talk to both of them and listen carefully.","I will talk to both of them and offer them a banana."]
],

// ---- Business 4: Business case studies ----
"study/bus/business-case-studies":[
 [
  "Today we are looking at a famous coffee company.",
  "First, I will describe the company and its products.",
  "Who sells similar things in this market?",
  "The company has a strong brand but high prices.",
  "Sales are falling every year.",
  "Could you explain why you chose this plan?",
  "One competitor sells almost the same product at a lower price.",
  "The biggest risk is that customers may switch to cheaper options.",
  "We need to analyse the data before we decide anything.",
  "I recommend that the company lowers its prices.",
  "Its main strength is a loyal group of customers, but its main weakness is the high cost.",
  "In conclusion, the company should invest more in online sales."
 ],
 [
  ["Competitor","A company that sells similar products to yours"],
  ["Risk","The chance that something bad may happen"],
  ["Analyse","To study something carefully to understand it"],
  ["Recommend","To suggest that something is a good choice"],
  ["Strength","Something that a business does very well"],
  ["Weakness","A part of a business that is not strong"],
  ["Conclusion","The final part of a talk or report"]
 ],
 [
  ["Before we ___ a solution, we must analyse the problem.",["recommending","recommends","recommend"],2],
  ["If the company ___ its prices, sales might increase.",["lower","lowers","will lower"],1],
  ["The report ___ that sales fell by ten percent.",["show","shows","showing"],1],
  ["Our group will present the findings ___ Thursday.",["in","on","at"],1]
 ],
 ["What is your main recommendation for the company?","I recommend that the company lowers its prices and improves service.","I recommend that the company lowers its prices and hires a dragon."]
],

/* ===================== FIELD: Medicine ===================== */

// ---- Medicine 1: Anatomy and lectures ----
"study/med/anatomy-and-lectures":[
 [
  "Where is the liver in the human body?",
  "The heart pumps blood around the body.",
  "Could you repeat the last point, please?",
  "Our lecture starts at nine tomorrow.",
  "I always draw the nervous system to learn it.",
  "Flashcards help me learn the long Latin names quickly.",
  "The heart is an organ that pumps blood through the whole body.",
  "An artery carries blood away from the heart.",
  "The human skeleton protects the organs and supports the body.",
  "Which muscles move the shoulder, and where do they attach to the bone?",
  "We wear gloves and coats in the dissection lab.",
  "I have to memorise the bones of the hand, so I use a diagram."
 ],
 [
  ["Organ","A body part with a special job, like the heart"],
  ["Artery","A blood vessel that carries blood away from the heart"],
  ["Skeleton","The frame of bones that supports the body"],
  ["Muscle","Body tissue that tightens to make parts move"],
  ["Dissection","Careful cutting of a body to study its parts"],
  ["Memorise","To learn something so you can remember it exactly"],
  ["Diagram","A simple drawing that explains something"]
 ],
 [
  ["The lungs ___ by the ribs.",["protect","are protected","protecting"],1],
  ["If I had studied the diagram, I ___ the answer.",["know","would know","would have known"],2],
  ["Blood ___ through the arteries to every part of the body.",["flow","flows","flowing"],1],
  ["I wish I ___ the names more easily.",["remember","could remember","can remember"],1]
 ],
 ["Did you understand the anatomy lecture today?","Yes, I understood most of it, but I need to study the nerves.","Yes, I understood most of it, and then the skeleton danced in the cafeteria."]
],

// ---- Medicine 2: Clinical practice ----
"study/med/clinical-practice":[
 [
  "Good morning, I am a medical student.",
  "Please wash your hands before you see anyone.",
  "How long have you had this pain?",
  "Do you take any medicine every day?",
  "I will check with my teacher before I write anything.",
  "The doctor looked at him while I took notes.",
  "May I observe the ward round this morning?",
  "My supervisor asked me to take the history of the patient in bed four.",
  "You must ask the patient for consent before any examination.",
  "The doctor wrote a prescription for the infection.",
  "Fever and cough are common symptoms of a cold.",
  "After the round, my supervisor gave me feedback on my questions."
 ],
 [
  ["Observe","To watch something carefully"],
  ["Ward","A hospital room where patients stay"],
  ["Supervisor","A senior person who guides and checks your work"],
  ["Patient","A person who receives medical care"],
  ["Consent","Permission given before a treatment"],
  ["Prescription","A written order from a doctor for medicine"],
  ["Symptoms","Signs that show a person is ill"]
 ],
 [
  ["You must ask for ___ before you examine a patient.",["consent","consist","content"],0],
  ["The patient ___ in bed four since Monday.",["is","has been","was being"],1],
  ["I would like ___ the ward round, please.",["observe","to observe","observing"],1],
  ["My supervisor told me ___ my hands before every patient.",["wash","washing","to wash"],2]
 ],
 ["Could you take the history from the patient in bed four?","Yes, of course, I will start by asking about his symptoms.","Yes, of course, I will start by asking his pillow about its symptoms."]
],

// ---- Medicine 3: Talking about diseases ----
"study/med/talking-about-diseases":[
 [
  "I have a sore throat and a fever.",
  "How long have you felt like this?",
  "Do you feel any pain when you breathe deeply?",
  "You need to take this tablet twice a day.",
  "Can you explain in simple words what this illness is?",
  "Do not worry, this problem is common and easy to fix.",
  "Washing your hands often helps to prevent infection.",
  "The doctor made a diagnosis after he saw the test results.",
  "The treatment lasts six weeks, and most patients recover completely.",
  "The vaccine protects the body from a serious virus.",
  "Regular exercise and a healthy diet reduce the risk of heart problems.",
  "Your blood test shows that your sugar level is too high."
 ],
 [
  ["Prevent","To stop something from happening"],
  ["Infection","Illness caused by germs entering the body"],
  ["Diagnosis","The decision about which illness a person has"],
  ["Treatment","Medical care given to cure or ease an illness"],
  ["Recover","To become healthy again after an illness"],
  ["Vaccine","An injection that protects the body from a disease"],
  ["Risk","The chance that something bad may happen"]
 ],
 [
  ["Washing your hands helps to ___ infection.",["prevent","preventing","prevention"],0],
  ["I have had a fever ___ three days.",["since","for","during"],1],
  ["The doctor will ___ the illness after the tests.",["diagnosis","diagnosing","diagnose"],2],
  ["If the treatment ___ work, we will try another medicine.",["doesn't","won't","didn't"],0]
 ],
 ["How long have you had these symptoms?","I have had them for about three days, and they are getting worse.","I have had them for about three days, and a penguin sneezed on me."]
],

// ---- Medicine 4: Medical exams ----
"study/med/medical-exams":[
 [
  "I have an anatomy test next Monday.",
  "How many hours do you study every day?",
  "Our study group meets in the library after class.",
  "Can you test me on the names of the nerves?",
  "Taking short breaks and sleeping well helps me stay calm.",
  "Let us go through the case questions together tonight.",
  "I made a revision timetable for every subject.",
  "The examiner asked me what I would do next.",
  "Stress before an exam is normal, but it can make you forget things.",
  "Please read the syllabus, because it lists every topic in the exam.",
  "I felt nervous at first, but I calmed down during the oral exam.",
  "I was so relieved when I saw my result online."
 ],
 [
  ["Revision","Studying again what you learned before a test"],
  ["Examiner","A person who tests and marks your knowledge"],
  ["Stress","A worried feeling caused by pressure"],
  ["Syllabus","A list of the topics in a course"],
  ["Nervous","Worried and a little afraid"],
  ["Relieved","Happy because a worry has ended"],
  ["Result","The mark you receive after an exam"]
 ],
 [
  ["I am ___ for my anatomy exam this week.",["revising","revision","revise"],0],
  ["Our study group ___ every Tuesday in the library.",["meet","meets","meeting"],1],
  ["I was relieved ___ I saw that I had passed.",["although","unless","when"],2],
  ["I did not pass the first time, but I learned ___ from it.",["many","a lot","much of"],1]
 ],
 ["Are you ready for your exam tomorrow?","Almost, I just need to revise the last chapter.","Almost, I just need to teach my goldfish the last chapter."]
],

/* ===================== FIELD: Engineering ===================== */

// ---- Engineering 1: Design and drawings ----
"study/eng/design-and-drawings":[
 [
  "I made a quick drawing of the bridge.",
  "Can you check the numbers on this drawing?",
  "We use software to draw the model on the computer.",
  "Could you make the lines thicker so they are easier to read?",
  "Why did you change the design of the support?",
  "The first design was too expensive, so we made it simpler.",
  "I drew a rough sketch of the bridge before using the software.",
  "The scale of this plan is one to fifty.",
  "Which material is strong enough for this part?",
  "Please add every dimension to the drawing, including the height.",
  "The engineer checked the blueprint of the building twice.",
  "We built a prototype to check that the part fits within the tolerance."
 ],
 [
  ["Sketch","A quick, simple drawing made by hand"],
  ["Scale","The ratio between a drawing and the real object"],
  ["Material","The substance that something is made from"],
  ["Dimension","A measurement such as length, width or height"],
  ["Blueprint","A detailed technical plan of a building or machine"],
  ["Tolerance","The small difference in size that is allowed"],
  ["Prototype","A first model made to test an idea"]
 ],
 [
  ["The beam is three metres ___.",["long","length","lengthen"],0],
  ["Steel is ___ than plastic.",["strong","stronger","strongest"],1],
  ["We chose aluminium ___ it is light and does not rust.",["so","although","because"],2],
  ["The drawing ___ by the team last week.",["finished","was finished","has finish"],1]
 ],
 ["Is this drawing made to scale?","Yes, it is, one centimetre on paper is one metre in real life.","Yes, it is, one centimetre on paper is one banana in real life."]
],

// ---- Engineering 2: Lab work ----
"study/eng/lab-work":[
 [
  "Please put on your safety glasses first.",
  "Where is the emergency exit in this lab?",
  "Never touch the machines with wet hands.",
  "Could you show me how to start the machine?",
  "The result is different from what we expected, so I will repeat it.",
  "Let us compare our numbers to see if we made a mistake.",
  "All the equipment must be switched off before you leave the lab.",
  "I wrote down the reading every two minutes during the experiment.",
  "A wet floor is a safety hazard, so tell the technician immediately.",
  "What was the temperature when the sample started to bend?",
  "We have to calibrate the sensor before we begin.",
  "In the report, I explained the method and the main errors."
 ],
 [
  ["Equipment","Tools and machines used to do a job"],
  ["Experiment","A test done to discover or prove something"],
  ["Reading","A number shown by a measuring instrument"],
  ["Hazard","Something that can cause danger or harm"],
  ["Technician","A person who looks after lab machines"],
  ["Sample","A small part taken for testing"],
  ["Calibrate","To adjust an instrument so it measures correctly"]
 ],
 [
  ["You must wear gloves ___ you handle hot samples.",["when","for","to"],0],
  ["We have ___ the experiment twice already.",["repeat","repeated","repeating"],1],
  ["The lab report must ___ finished by Friday.",["been","being","be"],2],
  ["If the sensor ___ calibrated, the readings will be wrong.",["isn't","wasn't","hadn't"],0]
 ],
 ["Did you finish the experiment on time?","Yes, I did, and the results look good.","Yes, I did, and the results look like a pizza."]
],

// ---- Engineering 3: Maths and physics ----
"study/eng/maths-and-physics":[
 [
  "What is the speed of the car?",
  "Two plus three equals five.",
  "Can you check my answer, please?",
  "The square root of sixteen is four.",
  "I forgot to change the centimetres into metres.",
  "How do we find the area of a circle?",
  "Force equals mass times acceleration.",
  "Energy cannot be created or destroyed, only changed from one form to another.",
  "Which formula should we use to find the speed?",
  "Gravity pulls every object towards the centre of the earth.",
  "Solve the equation first, and then convert the answer into metres.",
  "If the force doubles, the acceleration doubles as well."
 ],
 [
  ["Force","A push or pull acting on an object"],
  ["Acceleration","The rate at which speed changes"],
  ["Energy","The ability to do work or make things move"],
  ["Formula","A rule written with symbols for calculating"],
  ["Gravity","The pull that brings objects towards the earth"],
  ["Equation","A statement that two amounts are equal"],
  ["Convert","To change something into a different unit"]
 ],
 [
  ["Speed ___ distance divided by time.",["equal","equals","equaling"],1],
  ["I need to ___ centimetres into metres.",["convertible","conversion","convert"],2],
  ["The heavier the object, the ___ force we need to move it.",["more","most","much"],0],
  ["If you ___ the mass, the force will increase too.",["double","doubled","will double"],0]
 ],
 ["Can you help me with this physics problem?","Sure, let me see your calculation first.","Sure, let me see your calculation, and then we will ask a dragon."]
],

// ---- Engineering 4: Engineering projects ----
"study/eng/engineering-projects":[
 [
  "Our team is building a small robot car.",
  "Who will try it out tomorrow?",
  "We have five hundred pounds to spend.",
  "The motor stopped working during the first test.",
  "I will order the parts today if everyone agrees.",
  "What caused the problem with the battery?",
  "The team built a prototype and tested it twice this week.",
  "Our budget is limited, so we cannot buy expensive parts.",
  "The final deadline is in two weeks.",
  "Each member will explain one part of the project during the demonstration.",
  "The battery is the most important component of the robot.",
  "We are behind schedule, so each person is responsible for a clear task."
 ],
 [
  ["Prototype","A first model made to test an idea"],
  ["Budget","The amount of money available for a project"],
  ["Deadline","The latest time something must be finished"],
  ["Demonstration","A show that explains how something works"],
  ["Component","One part of a larger machine"],
  ["Schedule","A plan showing when things will happen"],
  ["Responsible","Having a duty to deal with something"]
 ],
 [
  ["We must finish the project ___ Friday.",["in","by","at"],1],
  ["The team ___ the prototype yesterday.",["test","testing","tested"],2],
  ["We cannot buy that part because it is ___ expensive.",["too","very much","enough"],0],
  ["If the prototype fails again, we ___ a cheaper solution.",["will need","would need","needed"],0]
 ],
 ["How is your team project going?","It is going well, we finished the prototype yesterday.","It is going well, we finished the prototype and then it flew to Mars."]
],

/* ===================== FIELD: Other degree ===================== */

// ---- Other degree 1: Choosing a degree ----
"study/gen/choosing-a-degree":[
 [
  "I am trying to choose what to study.",
  "What subjects do you enjoy the most?",
  "I love biology, so medicine looks interesting.",
  "My parents want me to study engineering.",
  "I need good grades in maths and physics.",
  "Is it possible to change my course later?",
  "Which degree has better job prospects?",
  "Could you tell me about the entry requirements?",
  "I am majoring in biology, but I may change my major next year.",
  "A good career adviser can explain your options clearly.",
  "Every course is worth one credit, and I need thirty more before I can graduate.",
  "Whatever I choose, I want a degree that leads to a rewarding career."
 ],
 [
  ["Degree","A qualification you get after finishing university"],
  ["Major","The main subject a student studies"],
  ["Career","The jobs a person does during their working life"],
  ["Credit","A point that counts towards finishing your degree"],
  ["Adviser","A person who gives guidance about your choices"],
  ["Requirements","Things you must have or do to be accepted"],
  ["Prospects","Chances of success in the future"]
 ],
 [
  ["I am interested ___ studying marine biology.",["on","at","in"],2],
  ["You need good grades to meet the entry ___.",["required","requirements","require"],1],
  ["I wish I ___ which course suits me best.",["knew","know","will know"],0],
  ["She is thinking about ___ her major to economics.",["change","changing","to changing"],1]
 ],
 ["Have you decided which degree to study?","Not yet, I am still comparing a few courses and talking to advisers.","Not yet, I am still comparing a few dragons and talking to pancakes."]
],

// ---- Other degree 2: Writing essays and reports ----
"study/gen/writing-essays-and-reports":[
 [
  "I have an essay due on Friday.",
  "What is the topic of your report?",
  "Where can I find good sources for this?",
  "The essay must be at least fifteen hundred words.",
  "I am still about two hundred words short.",
  "Could you check my introduction, please?",
  "First, I will make a simple outline of the main points.",
  "My thesis is that social media changes how we talk.",
  "Each paragraph should support the main argument.",
  "You need to reference every book and article that you use.",
  "After writing the first draft, I always proofread the whole text.",
  "In conclusion, I will repeat my main idea in a new way."
 ],
 [
  ["Outline","A short plan showing the main points to write"],
  ["Thesis","The main idea that an essay tries to prove"],
  ["Argument","Reasons given to support an idea"],
  ["Reference","To show where you found information"],
  ["Draft","A first version of a piece of writing"],
  ["Proofread","To check your writing for mistakes"],
  ["Conclusion","The final part of a piece of writing"]
 ],
 [
  ["The essay is due ___ Monday morning.",["in","on","at"],1],
  ["Please ___ your sources at the end of the report.",["list","lists","listed"],0],
  ["I have already ___ the first draft of my essay.",["write","wrote","written"],2],
  ["If I ___ earlier, I would not have rushed the conclusion.",["start","started","had started"],2]
 ],
 ["When is your essay due?","It is due on Friday, so I need to finish the outline today.","It is due on Friday, so I need to feed my homework to the cat."]
],

// ---- Other degree 3: Student life and clubs ----
"study/gen/student-life-and-clubs":[
 [
  "I just joined the hiking club.",
  "Which clubs are you thinking of joining?",
  "I have made some really good friends here.",
  "Do you want to play football with us tonight?",
  "I work part time at the cafe near the library.",
  "Could you tell me where the sports hall is?",
  "Our society is holding a welcome event on Saturday.",
  "The hostel is noisy, but I like it.",
  "Sometimes I feel homesick and call my mother.",
  "The campus is big, so it took me a week to find my way around.",
  "It is not easy to balance my studies and my part-time job.",
  "At first it was hard to leave my family, but I am starting to settle in."
 ],
 [
  ["Society","A student club for people with a shared interest"],
  ["Event","A planned activity that many people attend"],
  ["Hostel","A cheap place where students live"],
  ["Homesick","Sad because you miss your family and home"],
  ["Campus","The grounds and buildings of a university"],
  ["Balance","To give the right amount of time to different things"],
  ["Settle in","To become comfortable in a new place"]
 ],
 [
  ["I am thinking of ___ the chess club this term.",["join","to join","joining"],2],
  ["We ___ a party at the hostel last weekend.",["had","have","having"],0],
  ["Many students feel ___ when they first leave home.",["homesickness","homesick","homesickly"],1],
  ["It took me a month to ___ in to my new life.",["settle","settled","settling"],0]
 ],
 ["Are you enjoying life on campus?","Yes, I have joined a few clubs and I am meeting lots of new people.","Yes, I have joined a few clubs and I am training a squirrel to play chess."]
],

// ---- Other degree 4: Scholarships and applications ----
"study/gen/scholarships-and-applications":[
 [
  "I would like to apply for some help with my fees.",
  "Where can I download the form?",
  "Which papers do I need to send?",
  "I have my passport copy and my certificates.",
  "I am a little worried about all this paperwork.",
  "Could you write a short letter about me?",
  "I am applying for a scholarship to pay for my studies.",
  "Am I eligible if I am an international student?",
  "Please attach your academic transcript to the form.",
  "I am nervous about the interview next week.",
  "I asked my teacher to be my referee and write a reference letter.",
  "The deadline is the end of this month, and the committee will announce the results in May."
 ],
 [
  ["Scholarship","Money given to a student to help pay for study"],
  ["Eligible","Allowed to apply because you meet the rules"],
  ["Transcript","An official record of your courses and grades"],
  ["Interview","A formal meeting where you answer questions"],
  ["Referee","A person who recommends you in a letter"],
  ["Deadline","The last date by which something must be done"],
  ["Committee","A group of people who make a decision"]
 ],
 [
  ["I would like to ___ for a scholarship.",["applying","apply","applies"],1],
  ["You must send all documents ___ the deadline.",["before","between","among"],0],
  ["I was ___ a scholarship last week.",["offer","offering","offered"],2],
  ["They asked me why I ___ the scholarship.",["deserve","deserved","deserving"],1]
 ],
 ["Did you get the scholarship?","Yes, they emailed me the results this morning and I was thrilled.","Yes, they emailed me the results this morning and a penguin delivered them."]
]

}; // end of U

/* ---- Apply the new content to every Study unit ---- */
// apply(unit): replaces the old content with the Intermediate content.
//   u.s / u.w / u.q / u.ch = new sentences, words, quiz, chat
//   u.up = 1         -> the ENRICHMENT step below skips this unit
//   u.es0, u.sh0     -> the 6 easy sentences / the short sentences (used by the first exercise and the listening exercises)
function apply(u){
  var r=U[u.id];
  if(!r)return;
  u.s=r[0];u.w=r[1];u.q=r[2];u.ch=r[3];u.up=1;
  u.es0=r[0].slice(0,6);
  u.sh0=r[0].filter(function(x){return x.split(/\s+/).length<=6});
}
// 1) The 5 general Study units (they live in BASE).
BASE.forEach(apply);
// 2) The 20 field units (they live in FIELDS.study: cs, bus, med, eng, gen).
FIELDS.study.forEach(function(g){g.units.forEach(apply)});
})();
// LEVEL FILTER DATA: every unit has a level tag "lv" = "basic" | "inter" | "adv".
//   A unit without "lv" counts as "inter" (see lvOf() in the LEVEL FILTER section below).
// This block: Work section = BASIC level (A1-A2) + level tags for the old Work units.
