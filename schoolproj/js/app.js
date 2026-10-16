const session=JSON.parse(localStorage.getItem("sms_session")||"null");
const role=location.pathname.split("/").slice(-2,-1)[0];
if(!session || session.role!==role) location.href="../login.html";

const configs={
 admin:{title:"Admin Dashboard",items:[
 ["Dashboard","dashboard.html","▦"],["Students","students.html","♙"],["Teachers","teachers.html","♙"],["Parents","parents.html","♧"],["Staff","staff.html","▣"],["Accountants","accountants.html","▤"],["Classes","classes.html","▤"],["Subjects","subjects.html","◈"],["Attendance","attendance.html","✓"],["Routine","routine.html","◷"],["Homework","homework.html","✎"],["Exams & Results","exams.html","★"],["Fees & Payments","fees.html","रू"],["Expenses","expenses.html","↗"],["Notices","notices.html","!"],["Messages","messages.html","✉"],["Complaints","complaints.html","⚑"],["Events","events.html","◫"],["Reports","reports.html","▥"],["Users & Roles","users.html","⚙"],["Settings","settings.html","⚙"]]},
 teacher:{title:"Teacher Dashboard",items:[["Dashboard","dashboard.html","▦"],["My Classes","classes.html","▤"],["Students","students.html","♙"],["Attendance","attendance.html","✓"],["Routine","routine.html","◷"],["Homework","homework.html","✎"],["Exams & Results","exams.html","★"],["Messages","messages.html","✉"],["Notices","notices.html","!"]]},
 staff:{title:"Staff Dashboard",items:[["Dashboard","dashboard.html","▦"],["My Profile","profile.html","♙"],["Attendance","attendance.html","✓"],["Routine","routine.html","◷"],["Notices","notices.html","!"],["Messages","messages.html","✉"],["Complaints","complaints.html","⚑"]]},
 student:{title:"Student Dashboard",items:[["Dashboard","dashboard.html","▦"],["My Profile","profile.html","♙"],["Attendance","attendance.html","✓"],["Routine","routine.html","◷"],["Homework","homework.html","✎"],["Exams & Results","exams.html","★"],["Fees","fees.html","रू"],["Notices","notices.html","!"],["Messages","messages.html","✉"]]},
 accountant:{title:"Accountant Dashboard",items:[["Dashboard","dashboard.html","▦"],["Fees & Payments","fees.html","रू"],["Expenses","expenses.html","↗"],["Reports","reports.html","▥"],["Messages","messages.html","✉"],["Notices","notices.html","!"]]},
 parent:{title:"Parent Dashboard",items:[["Dashboard","dashboard.html","▦"],["My Child","students.html","♙"],["Attendance","attendance.html","✓"],["Routine","routine.html","◷"],["Homework","homework.html","✎"],["Exams & Results","exams.html","★"],["Fees & Payments","fees.html","रू"],["Notices","notices.html","!"],["Messages","messages.html","✉"],["Complaints","complaints.html","⚑"]]}
};
const cfg=configs[session.role];
document.title=cfg.title;
document.body.innerHTML=`
<div class="app">
 <aside class="sidebar" id="sidebar">
  <div class="side-brand"><div class="logo small">S</div><span>School<span>MS</span></span></div>
  <nav>${cfg.items.map((x,i)=>`<a class="nav-item ${location.pathname.endsWith("/"+x[1]) || (location.pathname.endsWith(x[1]) && location.pathname.includes("/"+session.role+"/")) ? "active" : ""}" href="${x[1]}" aria-current="${location.pathname.endsWith("/"+x[1]) || location.pathname.endsWith(x[1]) ? "page" : "false"}"><i>${x[2]}</i><span>${x[0]}</span></a>`).join("")}</nav>
  <button class="logout" onclick="logout()">↪ Logout</button>
 </aside>
 <main class="main">
  <header class="topbar"><button class="hamb" onclick="toggleSide()">☰</button><div><h2>${cfg.title}</h2><small>School Management System</small></div><div class="user"><span class="avatar">${session.name.charAt(0)}</span><span>${session.name}<small>${session.role}</small></span></div></header>
  <section id="content" class="content"></section>
 </main>
</div>`;
function logout(){localStorage.removeItem("sms_session");location.href="../login.html"}
function toggleSide(){document.getElementById("sidebar").classList.toggle("open")}
const page=location.pathname.split("/").pop().replace(".html","");
document.querySelectorAll(".nav-item").forEach(item=>{
 const href=item.getAttribute("href");
 if(href && location.pathname.endsWith("/"+href)){
   document.querySelectorAll(".nav-item").forEach(n=>{n.classList.remove("active");n.setAttribute("aria-current","false")});
   item.classList.add("active");
   item.setAttribute("aria-current","page");
 }
});
const labels={students:"Students",teachers:"Teachers",parents:"Parents",staff:"Staff",accountants:"Accountants",classes:"Classes",subjects:"Subjects",attendance:"Attendance",routine:"Class Routine",homework:"Homework & Assignments",exams:"Exams & Results",fees:"Fees & Payments",expenses:"Expenses",notices:"Notices",messages:"Messages",complaints:"Complaints & Concerns",events:"Events & Calendar",reports:"Reports & Analytics",users:"Users & Roles",settings:"School Settings",profile:"My Profile"};
function dashboard(){
 const parentChildren=session.role==="parent"?[...linkedChildrenForParent()]:[];
 const data=session.role==="admin"?[
 ["Total Students","1,248","+8%"],["Teachers","86","+4%"],["Parents","1,010","+6%"],["Fees Collected","रु 18.4L","+12%"]
 ]:session.role==="teacher"?[
 ["My Students","142","+5"],["Present Today","134","94.4%"],["Pending Homework","8","-3"],["Upcoming Exams","3","This month"]
 ]:session.role==="student"?[
 ["Attendance","94%","+2%"],["Pending Homework","3","This week"],["Upcoming Exams","2","This month"],["Fee Status","Paid","Current"]
 ]:session.role==="staff"?[
 ["Assigned Tasks","12","This week"],["Attendance","Present","Today"],["Notices","4","New"],["Messages","3","Unread"]
 ]:[
 ["Children",String(parentChildren.length),"Linked to your account"],["Attendance","94%","+2%"],["Pending Fees","रु 5,000","Due"],["Homework","3","Pending"]
 ];
 document.getElementById("content").innerHTML=`<div class="welcome"><div><h1>Welcome, ${session.name.split(" ")[0]} 👋</h1><p>Here is your school overview for today.</p></div><button class="btn primary">+ Quick Action</button></div>
 <div class="stats">${data.map(d=>`<div class="stat"><span>${d[0]}</span><strong>${d[1]}</strong><em>${d[2]}</em></div>`).join("")}</div>
 <div class="grid2"><div class="panel"><div class="panel-head"><h3>Recent Activity</h3><button class="link">View all</button></div><div class="activity">${["Attendance updated","New notice published","Homework submitted","Fee record updated"].map((x,i)=>`<div><b>${x}</b><small>${i+1} hour${i?"s":""} ago</small></div>`).join("")}</div></div>
 <div class="panel"><div class="panel-head"><h3>Today</h3></div><div class="today"><b>School is active</b><p>Check your assigned modules from the sidebar.</p><div class="progress"><span style="width:76%"></span></div><small>76% daily activities completed</small></div></div></div>`;
}
const moduleData={
students:{title:"Students",desc:"Manage student records, classes, guardians and academic information.",headers:["Student","Class","Guardian","Attendance","Status"],rows:[
["Aarav Sharma","Grade 10 A","Ram Sharma","96%","Active"],["Sita Karki","Grade 9 B","Hari Karki","94%","Active"],["Bibek Thapa","Grade 10 A","Mina Thapa","89%","Active"],["Anu Gurung","Grade 8 A","Ramesh Gurung","97%","Active"]]},
teachers:{title:"Teachers",desc:"Manage teacher profiles, subjects, classes and teaching status.",headers:["Teacher","Subject","Classes","Phone","Status"],rows:[
["Ramesh Adhikari","Mathematics","9A, 10A","98XXXXXXXX","Active"],["Sita Rana","Science","8A, 9B","97XXXXXXXX","Active"],["Kiran KC","English","10A, 10B","96XXXXXXXX","Active"]]},
parents:{title:"Parents & Guardians",desc:"View and manage parent/guardian information linked with students.",headers:["Parent","Student","Relation","Phone","Status"],rows:[
["Ram Sharma","Aarav Sharma","Father","98XXXXXXXX","Active"],["Hari Karki","Sita Karki","Father","97XXXXXXXX","Active"],["Mina Thapa","Bibek Thapa","Mother","96XXXXXXXX","Active"]]},
staff:{title:"Staff",desc:"Manage non-teaching staff and school employees.",headers:["Staff Member","Department","Role","Phone","Status"],rows:[
["Maya KC","Administration","Office Assistant","98XXXXXXXX","Active"],["Dinesh Rai","Accounts","Accountant","97XXXXXXXX","Active"],["Prem BK","Transport","Driver","96XXXXXXXX","Active"]]},
accountants:{title:"Accountants",desc:"Manage accountant profiles and school finance access.",headers:["Accountant","Department","Phone","Status"],rows:[]},
classes:{title:"Classes & Sections",desc:"Manage grades, sections, class teachers and capacity.",headers:["Class","Section","Class Teacher","Students","Status"],rows:[
["Grade 10","A","Ramesh Adhikari","32","Active"],["Grade 10","B","Sita Rana","30","Active"],["Grade 9","A","Kiran KC","34","Active"],["Grade 8","A","Maya Shrestha","29","Active"]]},
subjects:{title:"Subjects",desc:"Manage subjects assigned to classes and teachers.",headers:["Subject","Code","Classes","Teacher","Status"],rows:[
["Mathematics","MATH-10","9A, 10A","Ramesh Adhikari","Active"],["Science","SCI-09","8A, 9B","Sita Rana","Active"],["English","ENG-10","10A, 10B","Kiran KC","Active"]]},
attendance:{title:"Attendance",desc:"Track daily student attendance and attendance summaries.",headers:["Date","Class","Present","Absent","Rate"],rows:[
["2026-10-07","Grade 10 A","30","2","94%"],["2026-10-07","Grade 10 B","28","2","93%"],["2026-10-07","Grade 9 A","32","2","94%"],["2026-10-06","Grade 8 A","28","1","97%"]]},
routine:{title:"Class Routine",desc:"View and manage weekly class schedules and periods.",headers:["Day","Time","Class","Subject","Teacher"],rows:[
["Sunday","10:00 AM","10 A","Mathematics","Ramesh Adhikari"],["Sunday","11:00 AM","10 A","Science","Sita Rana"],["Monday","10:00 AM","10 A","English","Kiran KC"],["Monday","12:00 PM","10 A","Computer","Maya Shrestha"]]},
homework:{title:"Homework & Assignments",desc:"Create, publish and monitor homework and assignment submissions.",headers:["Assignment","Subject","Class","Due Date","Status"],rows:[
["Algebra Exercise","Mathematics","10 A","2026-10-09","Published"],["Chapter 5 Questions","Science","9 B","2026-10-10","Published"],["Essay Writing","English","10 A","2026-10-11","Pending Review"]]},
exams:{title:"Exams & Results",desc:"Manage examinations, schedules, marks and student results.",headers:["Exam","Subject","Class","Date","Status"],rows:[
["First Terminal","Mathematics","10 A","2026-10-15","Scheduled"],["First Terminal","Science","10 A","2026-10-17","Scheduled"],["Unit Test","English","9 B","2026-10-12","Scheduled"]]},
fees:{title:"Fees & Payments",desc:"Track student fees, invoices, payments and outstanding balances.",headers:["Student","Invoice","Amount","Due Date","Status"],rows:[
["Aarav Sharma","INV-1024","रु 12,500","2026-10-15","Paid"],["Sita Karki","INV-1025","रु 12,500","2026-10-15","Pending"],["Bibek Thapa","INV-1026","रु 10,000","2026-10-18","Partial"]]},
expenses:{title:"Expenses",desc:"Record and monitor school operational expenses.",headers:["Expense","Category","Amount","Date","Status"],rows:[
["Electricity Bill","Utilities","रु 18,500","2026-10-05","Paid"],["Stationery Purchase","Supplies","रु 12,800","2026-10-04","Paid"],["Bus Maintenance","Transport","रु 25,000","2026-10-02","Pending"]]},
notices:{title:"Notices",desc:"Publish school announcements and important notices.",headers:["Notice","Audience","Published","Priority","Status"],rows:[
["Dashain Holiday Notice","All Users","2026-10-06","High","Published"],["Parent Meeting","Parents","2026-10-05","Medium","Published"],["Exam Preparation","Students","2026-10-04","Medium","Published"]]},
messages:{title:"Messages",desc:"Communicate with students, parents, teachers and staff.",headers:["From / To","Subject","Date","Type","Status"],rows:[
["Parent: Ram Sharma","Attendance inquiry","2026-10-07","Parent","Unread"],["Teacher: Sita Rana","Exam schedule","2026-10-06","Teacher","Read"],["Admin","Staff meeting","2026-10-05","Admin","Read"]]},
complaints:{title:"Complaints & Concerns",desc:"Submit and track concerns related to a student. Parents only see complaints linked to their own child.",headers:["Child / Student","Complaint","Date","Submitted By","Status"],rows:[]},
events:{title:"Events & Calendar",desc:"Manage school events, meetings, holidays and activities.",headers:["Event","Date","Time","Location","Status"],rows:[
["Parent-Teacher Meeting","2026-10-12","10:00 AM","School Hall","Upcoming"],["Sports Day","2026-10-20","9:00 AM","School Ground","Upcoming"],["Staff Meeting","2026-10-08","3:00 PM","Conference Room","Upcoming"]]},
reports:{title:"Reports & Analytics",desc:"View academic, attendance, finance and school performance reports.",headers:["Report","Category","Period","Updated","Action"],rows:[
["Student Attendance Report","Attendance","October 2026","Today","View"],["Fee Collection Report","Finance","October 2026","Today","View"],["Exam Performance Report","Academic","Terminal 1","Yesterday","View"]]},
users:{title:"Users & Roles",desc:"Accounts created and managed by the administrator. Passwords are never shown here.",headers:["User","Email","Role","Last Login","Status"],rows:[["School Admin","admin@school.com","Admin","Today","Active"]]},
settings:{title:"School Settings",desc:"Configure school profile, academic year, notifications and system preferences.",headers:["Setting","Current Value","Category","Updated","Action"],rows:[
["School Name","ABC Secondary School","General","Today","Edit"],["Academic Year","2083","Academic","Today","Edit"],["SMS Notifications","Enabled","Communication","Yesterday","Edit"],["Late Attendance Alert","Enabled","Attendance","Yesterday","Edit"]]},
profile:{title:"My Profile",desc:"View your personal and account information.",headers:["Field","Information","Category","Status","Action"],rows:[
["Name",session.name,"Personal","Verified","Edit"],["Email",session.email,"Account","Verified","Edit"],["Role",session.role,"Access","Active","View"]]}
};


const formSchemas={
 students:[
  ["name","Student Name","text",true],["email","Login ID / Email","text",true],["className","Class / Section","text",true],["guardian","Guardian Name","text",true],
  ["phone","Guardian Phone","tel",false],["attendance","Attendance %","number",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 teachers:[
  ["name","Teacher Name","text",true],["email","Login ID / Email","text",true],["subject","Subject","text",true],["classes","Classes","text",true],
  ["phone","Phone","tel",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 parents:[
  ["name","Parent / Guardian Name","text",true],["email","Login ID / Email","text",true],["student","Student","text",true],["relation","Relation","text",true],
  ["phone","Phone","tel",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 staff:[
  ["name","Staff Member","text",true],["email","Login ID / Email","text",true],["department","Department","text",true],["roleName","Role","text",true],
  ["phone","Phone","tel",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 accountants:[
  ["name","Accountant Name","text",true],["email","Login ID / Email","text",true],["department","Department","text",true],["phone","Phone","tel",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 classes:[
  ["className","Class / Grade","text",true],["section","Section","text",true],["classTeacher","Class Teacher","text",true],
  ["students","Student Capacity / Count","number",true],["status","Status","select",true,["Active","Inactive"]]
 ],
 subjects:[
  ["name","Subject Name","text",true],["code","Subject Code","text",true],["classes","Classes","text",true],
  ["teacher","Teacher","text",true],["status","Status","select",true,["Active","Inactive"]]
 ],
 attendance:[
  ["date","Date","date",true],["className","Class / Section","text",true],["present","Present","number",true],
  ["absent","Absent","number",true],["rate","Attendance Rate %","number",false]
 ],
 routine:[
  ["day","Day","text",true],["time","Time / Period","text",true],["className","Class / Section","text",true],
  ["subject","Subject","text",true],["teacher","Teacher","text",true]
 ],
 homework:[
  ["name","Assignment / Homework","text",true],["subject","Subject","text",true],["className","Class / Section","text",true],
  ["dueDate","Due Date","date",true],["status","Status","select",true,["Published","Pending Review","Closed"]]
 ],
 exams:[
  ["name","Exam Name","text",true],["subject","Subject","text",true],["className","Class / Section","text",true],
  ["date","Exam Date","date",true],["status","Status","select",true,["Scheduled","Completed","Cancelled"]]
 ],
 fees:[
  ["student","Student","text",true],["invoice","Invoice No.","text",true],["amount","Amount (रु)","number",true],
  ["dueDate","Due Date","date",true],["status","Payment Status","select",true,["Paid","Pending","Partial"]]
 ],
 expenses:[
  ["name","Expense Name","text",true],["category","Category","text",true],["amount","Amount (रु)","number",true],
  ["date","Date","date",true],["status","Status","select",true,["Paid","Pending"]]
 ],
 notices:[
  ["name","Notice Title","text",true],["audience","Audience","text",true],["published","Published Date","date",true],
  ["priority","Priority","select",true,["High","Medium","Low"]],["status","Status","select",true,["Published","Draft"]]
 ],
 messages:[
  ["fromTo","From / To","text",true],["name","Subject","text",true],["date","Date","date",true],
  ["type","Type","text",true],["status","Status","select",true,["Read","Unread"]]
 ],
 complaints:[["student","Child / Student Name","text",true],["complaint","Complaint / Concern","text",true],["date","Date","date",true],["submittedBy","Submitted By","text",false],["status","Status","select",true,["Open","In Progress","Resolved"]]],
 events:[
  ["name","Event Name","text",true],["date","Date","date",true],["time","Time","text",true],
  ["location","Location","text",true],["status","Status","select",true,["Upcoming","Completed","Cancelled"]]
 ],
 users:[
  ["name","User Name","text",true],["email","Login ID / Email","text",true],["password","Initial Password","password",false],["roleName","Role","select",true,["Admin","Teacher","Student","Parent","Staff","Accountant"]],
  ["lastLogin","Last Login","text",false],["status","Status","select",true,["Active","Inactive"]]
 ],
 settings:[
  ["name","Setting","text",true],["value","Current Value","text",true],["category","Category","text",true],
  ["updated","Updated","text",false]
 ],
 profile:[
  ["name","Name","text",true],["email","Email","email",true],["roleName","Role","text",true],
  ["status","Status","text",false]
 ]
};

const addablePages=new Set(["students","teachers","parents","staff","accountants","classes","subjects","attendance","routine","homework","exams","fees","expenses","notices","messages","complaints","events","users"]);
const editablePages=new Set([...addablePages,"settings","profile"]);
const roleAddPages={
 admin:new Set([...addablePages]),
 teacher:new Set(["attendance","routine","homework","exams","messages","notices","complaints"]),
 accountant:new Set(["fees","expenses","messages","notices"]),
 student:new Set([]), parent:new Set(["complaints"]), staff:new Set(["attendance","routine","notices","messages","complaints"])
};
const roleEditPages={
 admin:new Set([...editablePages]),
 teacher:new Set(["attendance","routine","homework","exams","messages","notices","complaints"]),
 accountant:new Set(["fees","expenses","messages","notices"]),
 student:new Set([]), parent:new Set(["complaints"]), staff:new Set(["attendance","routine","notices","messages","complaints"])
};
const viewablePages=new Set(Object.keys(moduleData));

const tableFields={
 students:["name","className","guardian","attendance","status"],
 teachers:["name","subject","classes","phone","status"],
 parents:["name","student","relation","phone","status"],
 staff:["name","department","roleName","phone","status"],
 accountants:["name","department","phone","status"]
};
function migrateRoleRows(pageName, rows){
 const fields=tableFields[pageName];
 if(!fields || !Array.isArray(rows)) return rows;
 const expected=fields.length;
 let changed=false;
 const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
 const migrated=rows.map(r=>{
   if(!Array.isArray(r)) return r;
   if(r.length===expected) return r;
   // Older versions accidentally saved account fields (email/password) inside the module table.
   // Normalize those rows back to the exact columns used by the original table.
   let out=null;
   if(pageName==="students" && r.length>=7) out=[r[0]||"",r[2]||"",r[3]||"",r[5]||"",r[r.length-1]||"Active"];
   else if(pageName==="teachers" && r.length>=6) out=[r[0]||"",r[2]||"",r[3]||"",r[4]||"",r[r.length-1]||"Active"];
   else if(pageName==="parents" && r.length>=6) out=[r[0]||"",r[2]||"",r[3]||"",r[4]||"",r[r.length-1]||"Active"];
   else if(pageName==="staff" && r.length>=6) out=[r[0]||"",r[2]||"",r[3]||"",r[4]||"",r[r.length-1]||"Active"];
   else if(pageName==="accountants" && r.length>=5) out=[r[0]||"",r[2]||"",r[3]||"",r[r.length-1]||"Active"];
   else out=r.slice(0,expected);
   if(out.length===expected){ changed=true; return out; }
   return r.slice(0,expected);
 });
 if(changed) localStorage.setItem("sms_accounts",JSON.stringify(accounts));
 return migrated;
}
function getRows(){
 const d=moduleData[page];
 if(!d) return [];
 if(page==="users"){
   const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
   const roleLabel={admin:"Admin",teacher:"Teacher",student:"Student",parent:"Parent",staff:"Staff",accountant:"Accountant"};
   return Object.entries(accounts).map(([email,a])=>[a.name||email,email,roleLabel[a.role]||a.role||"User",a.lastLogin||"Never",a.status||"Active"]);
 }
 const key="sms_shared_"+page+"_rows";
 try{
   const saved=JSON.parse(localStorage.getItem(key)||"null");
   if(Array.isArray(saved)){
     const fixed=migrateRoleRows(page,saved);
     if(JSON.stringify(fixed)!==JSON.stringify(saved)) localStorage.setItem(key,JSON.stringify(fixed));
     return filterRowsForCurrentUser(page,fixed);
   }
 }catch(e){}
 return filterRowsForCurrentUser(page,d.rows.map(r=>r.slice()));
}
function linkedChildrenForParent(){
 const parentName=String(session.name||"").trim().toLowerCase();
 const parentEmail=String(session.email||"").trim().toLowerCase();
 const parents=(()=>{try{return JSON.parse(localStorage.getItem("sms_shared_parents_rows")||"null")||moduleData.parents.rows}catch(e){return moduleData.parents.rows}})();
 const children=new Set();
 parents.forEach(r=>{const name=String(r[0]||"").trim().toLowerCase(); const email=String(r.email||"").trim().toLowerCase(); if(name===parentName || email===parentEmail){if(r[1]) children.add(String(r[1]).trim().toLowerCase());}});
 const students=(()=>{try{return JSON.parse(localStorage.getItem("sms_shared_students_rows")||"null")||moduleData.students.rows}catch(e){return moduleData.students.rows}})();
 students.forEach(r=>{if(String(r[2]||"").trim().toLowerCase()===parentName) children.add(String(r[0]||"").trim().toLowerCase());});
 return children;
}
function filterRowsForCurrentUser(pageName,rows){
 if(session.role!=="parent") return rows;
 const children=linkedChildrenForParent();
 if(pageName==="parents") return rows.filter(r=>String(r[0]||"").trim().toLowerCase()===String(session.name||"").trim().toLowerCase());
 if(pageName==="students") return rows.filter(r=>children.has(String(r[0]||"").trim().toLowerCase()));
 if(pageName==="complaints") return rows.filter(r=>children.has(String(r[0]||"").trim().toLowerCase()));
 if(pageName==="messages") {const tokens=[...children,String(session.name||"").toLowerCase(),String(session.email||"").toLowerCase()];return rows.filter(r=>tokens.some(t=>t && r.some(v=>String(v||"").toLowerCase().includes(t))));}
 if(["attendance","routine","homework","exams","fees"].includes(pageName)) return rows.filter(r=>r.some(v=>children.has(String(v||"").trim().toLowerCase())) || (pageName==="fees" && children.size===0 && String(r[0]||"").toLowerCase()===String(session.name||"").toLowerCase()));
 return rows;
}
function saveRows(rows){ localStorage.setItem("sms_shared_"+page+"_rows",JSON.stringify(migrateRoleRows(page,rows))); }
function rowStatus(r){return r[r.length-1]||""}
function makeField(field,value=""){
 const [key,label,type,required,options]=field;
 const val=value==null?"":value;
 if(type==="select") return `<label>${label}${required?" *":""}</label><select name="${key}" ${required?"required":""}>${options.map(o=>`<option ${String(o)===String(val)?"selected":""}>${o}</option>`).join("")}</select>`;
 return `<label>${label}${required?" *":""}</label><input name="${key}" type="${type}" value="${String(val).replace(/"/g,"&quot;")}" ${required?"required":""} ${type==="number"?"min=\"0\" step=\"any\"":""}>`;
}
function findAccountForRecord(name){
 const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
 const target=String(name||"").trim().toLowerCase();
 for(const [email,a] of Object.entries(accounts)){
   if(String(a.name||"").trim().toLowerCase()===target) return {email,...a};
 }
 return null;
}
function rowToObject(r){
 const schema=formSchemas[page]||[];
 const o={};
 if(page==="users") return {name:r[0]||"",email:r[1]||"",roleName:r[2]||"Student",lastLogin:r[3]||"Never",status:r[4]||"Active"};
 if(tableFields[page]){
   tableFields[page].forEach((key,i)=>o[key]=r[i]??"");
   const account=findAccountForRecord(o.name);
   if(account){ o.email=account.email||""; o.accountPassword=account.password||""; }
   return o;
 }
 schema.forEach((f,i)=>o[f[0]]=r[i]??"");
 return o;
}
function objectToRow(o){
 if(page==="users") return [o.name||"",o.email||"",o.roleName||"Student",o.lastLogin||"Never",o.status||"Active"];
 if(tableFields[page]) return tableFields[page].map(key=>o[key]??"");
 const row=(formSchemas[page]||[]).map(f=>o[f[0]]??"");
 if(page==="users") row[2]=o.password||"";
 if(page==="settings") row.push("Edit");
 if(page==="profile") row.push("Edit");
 return row;
}
function openRecordModal(mode,index=-1){
 const rows=getRows(), existing=index>=0?rowToObject(rows[index]):{};
 const title=(mode==="add"?"Add New ":mode==="edit"?"Edit ":"View Details: ")+(moduleData[page]?.title||labels[page]||"Record");
 const readonly=mode==="view";
 let fields=(formSchemas[page]||[]).map(f=>makeField(f,existing[f[0]])).join("");
 const accountPage=["students","teachers","parents","staff","accountants"].includes(page);
 if(accountPage && mode==="add") fields += `<div class="generated-password-field"><label>Initial Password *</label><div class="password-generator-row"><input id="generatedPassword" name="password" type="text" value="${generateInitialPassword()}" minlength="6" required autocomplete="off"><button class="iconbtn" type="button" onclick="regenerateInitialPassword()">Generate</button><button class="iconbtn" type="button" onclick="copyGeneratedPassword()">Copy</button></div><small class="form-help">Give this one-time password to the user. They must change it after first login.</small></div>`;
 const buttons=readonly?`<button class="btn primary" type="button" onclick="closeModal()">Close</button>`:`<button class="btn primary full" type="submit">${mode==="add"?"Save Record":"Save Changes"}</button>`;
 document.getElementById("modal").innerHTML=`<div class="modal-box ${readonly?"detail-box":""}">
   <button class="close" onclick="closeModal()">×</button><h2>${title}</h2>
   <form id="recordForm" data-mode="${mode}" data-index="${index}">${fields}${buttons}</form>
 </div>`;
 document.getElementById("modal").classList.add("show");
 if(readonly) document.querySelectorAll("#recordForm input,#recordForm select").forEach(x=>x.disabled=true);
 else document.getElementById("recordForm").onsubmit=saveRecord;
}
function regenerateInitialPassword(){
 const input=document.getElementById("generatedPassword");
 if(input) input.value=generateInitialPassword();
}
async function copyGeneratedPassword(){
 const input=document.getElementById("generatedPassword");
 if(!input) return;
 input.select(); input.setSelectionRange(0,input.value.length);
 try{ await navigator.clipboard.writeText(input.value); }catch(e){ document.execCommand("copy"); }
 const btn=document.querySelector('.password-generator-row .iconbtn:last-child');
 if(btn){ const old=btn.textContent; btn.textContent="Copied"; setTimeout(()=>btn.textContent=old,1200); }
}
function generateInitialPassword(){
 const chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
 let out=""; for(let i=0;i<10;i++) out+=chars[Math.floor(Math.random()*chars.length)];
 return out;
}
function roleForPage(pageName){
 return {students:"student",teachers:"teacher",parents:"parent",staff:"staff",accountants:"accountant"}[pageName]||"";
}
function upsertAccountForRecord(data, pageName, generatedPassword){
 const email=String(data.email||"").trim().toLowerCase();
 if(!email) return {error:"Login ID / Email is required."};
 const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
 const existing=accounts[email];
 const role=roleForPage(pageName);
 if(existing && (!existing.role || existing.role!==role)) return {error:"This Login ID is already in use."};
 const password=existing?.password || generatedPassword || generateInitialPassword();
 accounts[email]={...(existing||{}),email,password,role,name:data.name||existing?.name||"",status:data.status||existing?.status||"Active",mustChangePassword:existing?.mustChangePassword ?? true,lastLogin:existing?.lastLogin||"Never"};
 localStorage.setItem("sms_accounts",JSON.stringify(accounts));
 return {email,password,isNew:!existing};
}
function deleteRecord(i){
 if(session.role!=="admin" || !confirm("Delete this record permanently? This cannot be undone.")) return;
 const rows=getRows(), row=rows[i];
 if(!row) return;
 const obj=rowToObject(row);
 if(page==="users" && String(obj.email||"").toLowerCase()==="admin@school.com") { alert("The built-in administrator account cannot be deleted."); return; }
 if(obj.email){
   const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
   delete accounts[String(obj.email).toLowerCase()];
   localStorage.setItem("sms_accounts",JSON.stringify(accounts));
 }
 rows.splice(i,1); saveRows(rows); renderModule();
}
function toggleAccount(i){
 if(session.role!=="admin") return;
 const rows=getRows(), obj=rowToObject(rows[i]);
 const next=obj.status==="Inactive"?"Active":"Inactive";
 obj.status=next;
 if(obj.email){
   const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
   const key=String(obj.email).toLowerCase();
   if(accounts[key]) accounts[key].status=next;
   localStorage.setItem("sms_accounts",JSON.stringify(accounts));
 }
 rows[i]=objectToRow(obj); saveRows(rows); renderModule();
}
function changeOwnPassword(oldPass,newPass){
 const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
 const a=accounts[session.email];
 if(!a || a.password!==oldPass) return "Old password is incorrect.";
 if(newPass.length<6) return "New password must be at least 6 characters.";
 a.password=newPass; a.mustChangePassword=false; accounts[session.email]=a;
 localStorage.setItem("sms_accounts",JSON.stringify(accounts));
 const updated={...session,mustChangePassword:false}; localStorage.setItem("sms_session",JSON.stringify(updated));
 return "";
}
function showFirstLoginPasswordModal(){
 if(!session || !session.mustChangePassword || session.role==="admin") return;
 const modal=document.createElement("div"); modal.id="passwordChangeModal"; modal.className="modal show";
 modal.innerHTML=`<div class="modal-box"><h2>Change Your Password</h2><p class="muted">For security, please set your own password before entering your dashboard.</p><form id="passwordChangeForm"><label>Old Password *</label><input id="oldPassword" type="password" required autocomplete="current-password"><label>New Password *</label><input id="newPassword" type="password" minlength="6" required autocomplete="new-password"><label>Confirm Password *</label><input id="confirmPassword" type="password" minlength="6" required autocomplete="new-password"><div id="passwordError" class="error"></div><button class="btn primary full" type="submit">Change Password & Continue</button></form></div>`;
 document.body.appendChild(modal);
 document.getElementById("passwordChangeForm").onsubmit=e=>{e.preventDefault();const oldP=document.getElementById("oldPassword").value,newP=document.getElementById("newPassword").value,confirmP=document.getElementById("confirmPassword").value,err=document.getElementById("passwordError");if(newP!==confirmP){err.textContent="New password and confirm password do not match.";return;}const msg=changeOwnPassword(oldP,newP);if(msg){err.textContent=msg;return;}modal.remove();};
}
function saveRecord(e){
 e.preventDefault();
 const form=e.currentTarget, mode=form.dataset.mode, index=Number(form.dataset.index);
 const data={}; new FormData(form).forEach((v,k)=>data[k]=v);
 const accountPages=["students","teachers","parents","staff","accountants"];
 let credential=null;
 if(accountPages.includes(page)){
   const rowsBefore=getRows();
   if(mode==="edit" && index>=0){
     const oldObj=rowToObject(rowsBefore[index]||[]); const oldEmail=String(oldObj.email||"").toLowerCase(), newEmail=String(data.email||"").trim().toLowerCase();
     if(oldEmail && oldEmail!==newEmail){ const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}"); delete accounts[oldEmail]; localStorage.setItem("sms_accounts",JSON.stringify(accounts)); }
   }
   const requestedId=String(data.email||"").trim().toLowerCase();
   const existingAccounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
   if(mode==="add" && existingAccounts[requestedId]){alert("This Login ID is already in use. Please choose another Login ID.");return;}
   credential=upsertAccountForRecord(data,page,data.password);
   if(credential.error){alert(credential.error);return;}
   data.email=credential.email;
 }
 if(page==="attendance" && data.present!==undefined && data.absent!==undefined){
   const total=Number(data.present)+Number(data.absent); data.rate=total?((Number(data.present)/total)*100).toFixed(1):"0";
 }
 if(page==="notices" && !data.published) data.published=new Date().toISOString().slice(0,10);
 if(page==="complaints"){if(!data.date)data.date=new Date().toISOString().slice(0,10);if(session.role==="parent"){data.submittedBy=session.name;const kids=[...linkedChildrenForParent()];if(kids.length===1)data.student=kids[0];}}
 if(page==="users"){
   if(session.role!=="admin"){alert("Only admin can manage user accounts.");return;}
   const rows=getRows();
   const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}");
   const oldEmail=mode==="edit" && rows[index] ? String(rows[index][1]||"").toLowerCase() : "";
   const key=String(data.email||"").trim().toLowerCase();
   if(!key || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)){alert("Enter a valid email/login ID.");return;}
   if(key!==oldEmail && accounts[key]){alert("This Login ID already exists.");return;}
   const oldAccount=oldEmail?accounts[oldEmail]:null;
   if(mode==="edit" && oldEmail==="admin@school.com"){alert("The built-in administrator account cannot be edited here.");return;}
   if(mode==="edit" && !oldAccount){alert("The account could not be found. Refresh and try again.");return;}
   const roleName=String(data.roleName||"Student").toLowerCase();
   accounts[key]={...(oldAccount||{}),email:key,name:String(data.name||"").trim(),role:roleName,status:data.status||"Active",password:oldAccount?.password||generateInitialPassword(),mustChangePassword:oldAccount?.mustChangePassword??true,lastLogin:oldAccount?.lastLogin||"Never"};
   if(oldEmail && oldEmail!==key) delete accounts[oldEmail];
   localStorage.setItem("sms_accounts",JSON.stringify(accounts));
   closeModal();renderModule();return;
 }
 const rows=getRows();
 if(mode==="add") rows.push(objectToRow(data)); else rows[index]=objectToRow(data);
 saveRows(rows); closeModal(); renderModule();
 // Initial credentials are generated and copyable directly inside the add form.
 // Do not show a blocking popup after save.

}
function openModal(){ if((roleAddPages[session.role]||new Set()).has(page)) openRecordModal("add"); }
function editRecord(i){if((roleEditPages[session.role]||new Set()).has(page)) openRecordModal("edit",i)}
function viewRecord(i){if(viewablePages.has(page)) openRecordModal("view",i)}
function closeModal(){const m=document.getElementById("modal");if(m)m.classList.remove("show")}
function filterRows(q,status){
 const query=(q||"").toLowerCase(), wanted=(status||"").toLowerCase();
 document.querySelectorAll("#rows tr").forEach(r=>{
   const text=r.innerText.toLowerCase(), last=(r.dataset.status||"").toLowerCase();
   r.style.display=(!query||text.includes(query))&&(!wanted||wanted==="all records"||last===wanted)?"":"none";
 });
}
function renderModule(){
 const d=moduleData[page]||{title:labels[page]||cfg.title,desc:"Manage information from this section.",headers:["Name","Details","Date","Status"],rows:[["Sample record","Information","2026-10-07","Active"]]};
 const rows=getRows();
 const canAdd=(roleAddPages[session.role]||new Set()).has(page);
 const canEdit=(roleEditPages[session.role]||new Set()).has(page);
 const statusValues=[...new Set(rows.map(rowStatus).filter(Boolean))];
 document.getElementById("content").innerHTML=`
 <div class="page-head"><div><h1>${d.title}</h1><p>${d.desc}</p></div>${canAdd?`<button class="btn primary" onclick="openModal()">+ Add New</button>`:""}</div>
 <div class="module-summary"><div><b>${rows.length}</b><span>Records</span></div><div><b>${rows.filter(x=>["Active","Published","Scheduled","Paid","Upcoming"].includes(rowStatus(x))).length}</b><span>Active / Current</span></div><div><b>Today</b><span>Last updated</span></div></div>
 <div class="panel"><div class="toolbar">
   <input id="searchBox" placeholder="Search ${d.title}..." oninput="filterRows(this.value,document.getElementById('statusFilter').value)">
   <select id="statusFilter" onchange="filterRows(document.getElementById('searchBox').value,this.value)"><option>All Records</option>${statusValues.map(s=>`<option>${s}</option>`).join("")}</select>
 </div>
 <div class="table-wrap"><table><thead><tr>${(page==="users"?["User","Email","Role","Last Login","Status"]:d.headers).map(h=>`<th>${h}</th>`).join("")}<th>Actions</th></tr></thead><tbody id="rows">
 ${rows.map((r,i)=>{
   const displayIndexes=r.map((_,idx)=>idx);
   return `<tr data-status="${String(rowStatus(r)).replace(/"/g,"&quot;")}">${displayIndexes.map((j,k)=>{const v=r[j]??""; return k===0?`<td><b>${v}</b><small>${d.title} record ${i+1}</small></td>`:k===displayIndexes.length-1?`<td><span class="badge ${["Pending","Unread","Partial","Draft","Cancelled","Inactive"].includes(v)?"warn":"ok"}">${v}</span></td>`:`<td>${v}</td>`}).join("")}
 <td class="actions"><button class="iconbtn" onclick="viewRecord(${i})">View</button>${canEdit?`<button class="iconbtn" onclick="editRecord(${i})">Edit</button>`:""}${session.role==="admin" && ["students","teachers","parents","staff","accountants"].includes(page) ? `<button class="iconbtn" onclick="toggleAccount(${i})">${rowStatus(r)==="Inactive"?"Activate":"Deactivate"}</button>`:""}${session.role==="admin" ? `<button class="iconbtn danger" onclick="deleteRecord(${i})">Delete</button>`:""}</td></tr>`
 }).join("")}
 </tbody></table></div></div>
 <div id="modal" class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><button class="close" onclick="closeModal()">×</button></div></div>`;
}

function legacyGeneric(){
 const d=moduleData[page]||{title:labels[page]||cfg.title,desc:"Manage information from this section.",headers:["Name","Details","Date","Status","Action"],rows:[["Sample record","Information","2026-10-07","Active","View"],["Sample record 2","Information","2026-10-06","Active","View"]]};
 document.getElementById("content").innerHTML=`
 <div class="page-head"><div><h1>${d.title}</h1><p>${d.desc}</p></div>${session.role==="teacher"?`<button class="btn primary" onclick="openModal()">+ Add New</button>`:""}</div>
 <div class="module-summary"><div><b>${d.rows.length}</b><span>Records</span></div><div><b>${d.rows.filter(x=>["Active","Published","Scheduled","Paid","Upcoming"].includes(x[x.length-1])).length}</b><span>Active / Current</span></div><div><b>Today</b><span>Last updated</span></div></div>
 <div class="panel"><div class="toolbar"><input placeholder="Search ${d.title}..." oninput="filterRows(this.value)"><select><option>All Records</option><option>Active</option><option>Pending</option></select></div>
 <div class="table-wrap"><table><thead><tr>${d.headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody id="rows">
 ${d.rows.map((r,i)=>`<tr>${r.map((v,j)=>j===0?`<td><b>${v}</b><small>${d.title} record ${i+1}</small></td>`:j===r.length-1?`<td><span class="badge ${["Pending","Unread","Partial"].includes(v)?"warn":"ok"}">${v}</span></td>`:`<td>${v}</td>`).join("")}<td class="actions"><button class="iconbtn">View</button>${session.role==="teacher"?`<button class="iconbtn">Edit</button>`:""}</td></tr>`).join("")}
 </tbody></table></div></div>
 <div id="modal" class="modal"><div class="modal-box"><button class="close" onclick="closeModal()">×</button><h2>Add ${d.title}</h2><label>Name / Title</label><input placeholder="Enter name or title"><label>Details</label><input placeholder="Enter details"><button class="btn primary full" onclick="closeModal()">Save</button></div></div>`;
}
function generic(){renderModule()}
if(page==="dashboard") dashboard(); else generic();
setTimeout(showFirstLoginPasswordModal, 250);

