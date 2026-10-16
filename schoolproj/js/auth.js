const defaultAccounts={
 "admin@school.com":{password:"admin123",role:"admin",name:"School Admin",mustChangePassword:false,status:"Active"}
};
// Only the administrator has a built-in account. All other accounts are created
// by the administrator and receive a one-time initial password.
const legacyDemoEmails=[
 "teacher@school.com","student@school.com","parent@school.com","accountant@school.com"
];
let accounts;
try { accounts = JSON.parse(localStorage.getItem("sms_accounts") || "null"); } catch(e) { accounts = null; }
if(!accounts || typeof accounts!=="object" || Array.isArray(accounts)) accounts={};
legacyDemoEmails.forEach(email=>delete accounts[email]);
Object.entries(defaultAccounts).forEach(([email, account])=>{
  if(!accounts[email] || typeof accounts[email]!=="object") accounts[email]={...account};
  else accounts[email]={...account,...accounts[email],role:"admin",status:"Active",mustChangePassword:false};
});
localStorage.setItem("sms_accounts",JSON.stringify(accounts));
const paths={admin:"admin/dashboard.html",teacher:"teacher/dashboard.html",student:"student/dashboard.html",staff:"staff/dashboard.html",parent:"parent/dashboard.html",accountant:"accountant/dashboard.html"};
const form=document.getElementById("loginForm");
if(form) form.addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("email").value.trim().toLowerCase();
 const pass=document.getElementById("password").value;
 const a=JSON.parse(localStorage.getItem("sms_accounts")||"{}")[email];
 if(!a || a.password!==pass || a.status==="Inactive"){
   document.getElementById("error").textContent="Invalid login ID/password or inactive account.";
   return;
 }
 localStorage.setItem("sms_session",JSON.stringify({email,role:a.role,name:a.name,mustChangePassword:!!a.mustChangePassword}));
 location.href=paths[a.role]||paths.student;
});


function openForgotPassword(){
 const old=document.getElementById("forgotPasswordModal"); if(old) old.remove();
 const m=document.createElement("div"); m.id="forgotPasswordModal"; m.className="modal show";
 m.innerHTML=`<div class="modal-box"><button class="close" type="button" onclick="this.closest('.modal').remove()">×</button><h2>Change Password</h2><p class="muted">Enter your login ID and current password to set a new password.</p><form id="forgotPasswordForm"><label>Login ID / Email *</label><input id="fpEmail" type="text" required><label>Current Password *</label><input id="fpOld" type="password" required><label>New Password *</label><input id="fpNew" type="password" minlength="6" required><label>Confirm New Password *</label><input id="fpConfirm" type="password" minlength="6" required><div id="fpError" class="error"></div><button class="btn primary full" type="submit">Update Password</button></form></div>`;
 document.body.appendChild(m);
 document.getElementById("forgotPasswordForm").onsubmit=e=>{e.preventDefault(); const email=document.getElementById("fpEmail").value.trim().toLowerCase(),oldP=document.getElementById("fpOld").value,newP=document.getElementById("fpNew").value,confirmP=document.getElementById("fpConfirm").value,err=document.getElementById("fpError"); const accounts=JSON.parse(localStorage.getItem("sms_accounts")||"{}"); const a=accounts[email]; if(!a||a.password!==oldP){err.textContent="Login ID or current password is incorrect.";return;} if(newP.length<6){err.textContent="New password must be at least 6 characters.";return;} if(newP!==confirmP){err.textContent="New password and confirm password do not match.";return;} a.password=newP;a.mustChangePassword=false;accounts[email]=a;localStorage.setItem("sms_accounts",JSON.stringify(accounts));err.className="success";err.textContent="Password updated successfully. You can now login.";setTimeout(()=>m.remove(),700);};
}
