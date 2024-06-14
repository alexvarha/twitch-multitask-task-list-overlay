var G=(m,f,T)=>{if(!f.has(m))throw TypeError("Cannot "+T)};var l=(m,f,T)=>(G(m,f,"read from private field"),T?T.call(m):f.get(m)),w=(m,f,T)=>{if(f.has(m))throw TypeError("Cannot add the same private member more than once");f instanceof WeakSet?f.add(m):f.set(m,T)},U=(m,f,T,x)=>(G(m,f,"write to private field"),x?x.call(m,T):f.set(m,T),T);var E=(m,f,T)=>(G(m,f,"access private method"),T);(function(){"use strict";var N,B,v,A,K,L,$,I,p,D,b,q,_,F,z;let m,f,T=!1;function x(){const e=document.querySelector(".task-wrapper").clientHeight,t=document.querySelector(".task-container.primary"),s=t.scrollHeight,r=document.querySelector(".task-container.secondary");if(s>e&&!T){r.style.display="flex";const n=configs.settings.scrollSpeed.toString();let a=parseInt(n,10),c={duration:s/a*1e3,iterations:1,easing:"linear"};const y=getComputedStyle(document.documentElement).getPropertyValue("--card-gap-between").slice(0,-2);let g=s+parseInt(y,10),d=[{transform:"translateY(0)"},{transform:`translateY(-${g}px)`}],k=[{transform:"translateY(0)"},{transform:`translateY(-${g}px)`}];m=t.animate(d,c),f=r.animate(k,c),T=!0,Z()}else s<=e&&(r.style.display="none",Q())}function Q(){m&&m.cancel(),f&&f.cancel(),T=!1}function Z(){m&&(m.addEventListener("finish",V),m.addEventListener("cancel",V))}function V(){T=!1,x()}function R(o,e){o.innerText!==e&&(o.style.opacity="0",setTimeout(()=>{o.textContent=e,o.style.opacity="1"},700))}function X(o){const e=document.querySelector(":root");for(let[t,s]of Object.entries(o))t.includes("FontFamily")&&ee(s),e.style.setProperty(te(t),s)}function ee(o){WebFont.load({google:{families:[`${o}:100,400,700`]}})}function te(o){return`--${o.replace(/([A-Z])/g,"-$1").toLowerCase()}`}class J{constructor(e,t){this.username=this.validateUsername(e),this.userColor=(t==null?void 0:t.userColor)||"",this.tasks=[]}validateUsername(e){if(typeof e!="string")throw new Error("Username must be of type string");if(e=e.trim(),e.length===0)throw new Error("Username invalid");return e}addTask(e){return this.tasks.push(e),e}editTask(e,t){let s=this.getTask(e);return s?(s.setDescription(t),s):null}completeTask(e){let t=this.getTask(e);return t?(t.setCompletionStatus(!0),t):null}deleteTask(e){const t=[].concat(e).filter(r=>this.validTaskIndex(r)),s=[];return this.tasks=this.tasks.filter((r,n)=>t.includes(n)?(s.push(r),!1):!0),s}removeCompletedTasks(){const e=[];return this.tasks=this.tasks.filter(t=>t.isComplete()?(e.push(t),!1):!0),e}getTask(e){return this.validTaskIndex(e)?this.tasks[e]:null}getTasks(){return this.tasks}validTaskIndex(e){return!(typeof e!="number"||isNaN(e)||e<0||e>=this.tasks.length)}}class W{constructor(e){w(this,N);this.description=this.validateDescription(e),this.id=E(this,N,B).call(this),this.completionStatus=!1}validateDescription(e){if(typeof e!="string")throw new Error("Task description must be of type string");if(e=e.trim(),e.length===0)throw new Error("Task description invalid");return e}setDescription(e){this.description=this.validateDescription(e)}isComplete(){return this.completionStatus}setCompletionStatus(e){if(typeof e!="boolean")throw new Error("Completion status must be of type boolean");this.completionStatus=e}}N=new WeakSet,B=function(){const e=new Date,t=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0"),n=String(e.getSeconds()).padStart(2,"0"),a=String(e.getMilliseconds()).padStart(3,"0"),i=Math.floor(Math.random()*1e4);return`${t}${s}${r}${n}${a}${i}`};class se{constructor(e="userList"){w(this,A);w(this,L);w(this,v,void 0);U(this,v,e),this.tasksCompleted=0,this.totalTasks=0,this.users=E(this,A,K).call(this)}getUser(e){return this.users.find(t=>t.username===e)}getAllUsers(){return this.users}createUser(e,t){if(this.getUser(e))throw new Error(`${e} already exists`);const s=new J(e,t);return this.users.push(s),s}addUserTasks(e,t){const s=this.getUser(e);if(!s)throw new Error(`${e} does not exist`);const r=[].concat(t),n=[];return r.forEach(a=>{n.push(s.addTask(new W(a))),this.totalTasks++}),E(this,L,$).call(this),n}editUserTask(e,t,s){const r=this.getUser(e);if(!r)throw new Error(`${e} has no tasks`);const n=r.editTask(t,s);if(!n)throw new Error(`Task ${t} not found`);return E(this,L,$).call(this),n}completeUserTasks(e,t){const s=this.getUser(e);if(!s)throw new Error(`${e} has no tasks`);const n=[].concat(t).map(a=>{const i=s.getTask(a);return i&&!i.isComplete()&&(i.setCompletionStatus(!0),this.tasksCompleted++),i});return E(this,L,$).call(this),n}deleteUserTasks(e,t){const s=this.getUser(e);if(!s)throw new Error(`${e} has no tasks`);const r=[].concat(t),n=s.deleteTask(r);return s.getTasks().length===0&&this.deleteUser(e),this.decreaseTaskCount(n),E(this,L,$).call(this),n}checkUserTasks(e,t="incomplete"){const s=this.getUser(e);if(!s)throw new Error(`${e} has no tasks`);const r=new Map;return s.getTasks().forEach((n,a)=>{t==="incomplete"&&!n.isComplete()&&r.set(a,n),t==="complete"&&n.isComplete()&&r.set(a,n)}),r}clearUserList(){this.users=[],this.tasksCompleted=0,this.totalTasks=0,E(this,L,$).call(this)}clearDoneTasks(){let e=[];return this.users.forEach(t=>{let s=t.removeCompletedTasks();this.decreaseTaskCount(s),e=e.concat(s)}),E(this,L,$).call(this),e}deleteUser(e){const t=this.users.findIndex(n=>n.username===e);if(t===-1)throw new Error(`${e} not found`);const s=this.users[t],r=this.users.splice(t,1)[0];return this.decreaseTaskCount(r.getTasks()),E(this,L,$).call(this),s}decreaseTaskCount(e){e.forEach(t=>{t.isComplete()&&this.tasksCompleted--,this.totalTasks--})}}v=new WeakMap,A=new WeakSet,K=function(){const e=[];let t=localStorage.getItem(l(this,v));return t?JSON.parse(t).forEach(s=>{const r=new J(s.username,{userColor:s.userColor});s.tasks.map(n=>{const a=r.addTask(new W(n.description));this.totalTasks++,n.completionStatus&&(a.setCompletionStatus(n.completionStatus),this.tasksCompleted++)}),e.push(r)}):localStorage.setItem(l(this,v),JSON.stringify(e)),e},L=new WeakSet,$=function(){localStorage.setItem(l(this,v),JSON.stringify(this.users))};const re=document.getElementById("audioSample");class ne{constructor(e){w(this,I,null);this.userList=new se(e),X(configs.styles)}render(){this.renderTaskList(),this.renderTaskHeader()}renderTaskList(){if(this.userList.users.length===0)return;const e=document.createDocumentFragment();this.userList.getAllUsers().forEach(a=>{const i=j(a),c=i.querySelector("ol");a.tasks.forEach(y=>{const g=document.createElement("li");g.classList.add("task"),g.dataset.taskId=`${y.id}`,g.innerText=y.description,y.isComplete()&&g.classList.add("done"),c.appendChild(g)}),e.appendChild(i)});const t=e.cloneNode(!0),s=document.querySelector(".task-container.primary");s.innerHTML="",s.appendChild(t);const r=e.cloneNode(!0),n=document.querySelector(".task-container.secondary");n.innerHTML="",n.appendChild(r),x()}renderTaskHeader(){this.renderTaskCount();const{headerFeature:e,headerCustomText:t}=configs.settings;e.toLowerCase()==="timer"?this.renderTimer():e.toLowerCase()==="commands"?this.renderCommandTips():e.toLowerCase()==="text"&&this.renderCustomText(t)}renderTaskCount(){let e=this.userList.tasksCompleted,t=this.userList.totalTasks;const s=document.querySelector(".task-count");s.innerText=`${e}/${t}`}renderTimer(){document.querySelector(".timer").classList.remove("hidden")}startTimer(e=0,t=10){l(this,I)&&clearInterval(l(this,I));const s=document.querySelector(".timer"),r=s.querySelector(".timer-title"),n=s.querySelector(".timer-countdown");let a=e*60;R(r,"Focus");let i=!0;const c=()=>{const y=Math.floor(a/60).toString().padStart(2,"0"),g=(a%60).toString().padStart(2,"0");n.textContent=`${y}:${g}`,a===0?(clearInterval(l(this,I)),R(r,"Break"),n.textContent="00:00",re.play(),a=t*60,i&&(U(this,I,setInterval(c,1e3)),i=!1)):a--};U(this,I,setInterval(c,1e3))}renderCommandTips(){const e=["!add","!edit","!done","!remove","!check","!help"],t=document.querySelector(".command-tips");t.classList.remove("hidden");let s=0;setInterval(()=>{const r=t.querySelector(".command-code");R(r,e[s]),s=(s+1)%e.length},6e3)}renderCustomText(e){document.querySelector(".custom-header").classList.remove("hidden"),document.querySelector(".custom-text").textContent=e}chatHandler(e,t,s,r,n){t=`!${t.toLowerCase()}`;const{admin:a,user:i,settings:{languageCode:c,maxTasksPerUser:y,headerFeature:g}}=configs;let d="",k="";try{if(oe(r))if(g.toLowerCase()==="timer"&&a.commands.timer.includes(t)&&r.broadcaster){const[u,C]=s.split("/"),h=parseInt(u,10),S=parseInt(C,10)||10;if(isNaN(h)||h<0||isNaN(S)||S<0)throw new Error("Invalid timer duration");return this.startTimer(h,S),d=a.responseTo[c].timer,k=u,O(d,e,k)}else{if(a.commands.clearList.includes(t))return this.userList.clearUserList(),this.clearListFromDOM(),d=a.responseTo[c].clearList,O(d,e,k);if(a.commands.clearDone.includes(t))return this.userList.clearDoneTasks().forEach(({id:C})=>{this.deleteTaskFromDOM(C)}),d=a.responseTo[c].clearDone,O(d,e,k);if(a.commands.clearUser.includes(t)){const u=this.userList.deleteUser(s);return this.deleteUserFromDOM(u),k=u.username,d=a.responseTo[c].clearUser,O(d,e,k)}}if(i.commands.addTask.includes(t)){if(s==="")throw new Error("Task description is empty");let u=this.userList.getUser(e)||this.userList.createUser(e,{userColor:n.userColor});const C=s.split(", ");u.getTasks().length+C.length>parseInt(y.toString(),10)?d=i.responseTo[c].maxTasksAdded:(this.userList.addUserTasks(e,C).forEach(S=>{this.addTaskToDOM(u,S)}),k=s,d=i.responseTo[c].addTask)}else if(i.commands.editTask.includes(t)){const u=s.search(new RegExp("(?<=\\d)\\s"));if(u===-1)throw new Error("Task number or description format is invalid");const C=s.slice(0,u),h=s.slice(u+1),S=this.userList.editUserTask(e,M(C),h);this.editTaskFromDOM(S),k=C,d=i.responseTo[c].editTask}else if(i.commands.finishTask.includes(t)){const u=s.split(",").reduce((h,S)=>(M(S)>=0&&h.push(M(S)),h),[]);this.userList.completeUserTasks(e,u).forEach(({id:h})=>{this.completeTaskFromDOM(h)}),k=s,d=i.responseTo[c].finishTask}else if(i.commands.deleteTask.includes(t)){if(s.toLowerCase()==="all"){const u=this.userList.deleteUser(e);this.deleteUserFromDOM(u),d=i.responseTo[c].deleteAll}else{const u=s.split(",").reduce((h,S)=>(M(S)>=0&&h.push(M(S)),h),[]);this.userList.deleteUserTasks(e,u).forEach(({id:h})=>{this.deleteTaskFromDOM(h)}),d=i.responseTo[c].deleteTask}k=s}else if(i.commands.check.includes(t)){const u=this.userList.checkUserTasks(e),C=[];for(let[h,S]of u)C.push(`${h+1}. ${S.description}`);k=C.join(" | "),k===""?d=i.responseTo[c].noTaskFound:d=i.responseTo[c].check}else if(i.commands.help.includes(t))d=i.responseTo[c].help;else if(i.commands.additional.includes(t))d=i.responseTo[c].additional;else throw new Error("command not found");return O(d,e,k)}catch(u){return O(i.responseTo[c].invalidCommand,e,u.message,!0)}}clearListFromDOM(){const e=document.querySelector(".task-container.primary"),t=document.querySelector(".task-container.secondary");e.innerHTML="",t.innerHTML="",this.renderTaskCount()}addTaskToDOM(e,t){const s=document.querySelector(".task-container.primary"),r=document.querySelector(".task-container.secondary");if(document.querySelectorAll(`[data-user="${e.username}"]`).length===0){const c=j(e),y=c.cloneNode(!0);s.appendChild(c),r.appendChild(y)}const a=document.createElement("li");a.classList.add("task"),a.dataset.taskId=`${t.id}`,a.innerText=t.description;const i=a.cloneNode(!0);s.querySelector(`[data-user="${e.username}"] .tasks`).appendChild(a),r.querySelector(`[data-user="${e.username}"] .tasks`).appendChild(i),this.renderTaskCount(),x()}editTaskFromDOM(e){const t=document.querySelectorAll(`[data-task-id="${e.id}"]`);for(const s of t)s.innerText=e.description}completeTaskFromDOM(e){const t=document.querySelectorAll(`[data-task-id="${e}"]`);for(const s of t)s.classList.add("done");this.renderTaskCount()}deleteTaskFromDOM(e){const t=document.querySelectorAll(`[data-task-id="${e}"]`);for(const s of t)s.parentElement.children.length===1?s.parentElement.parentElement.remove():s.remove();this.renderTaskCount()}deleteUserFromDOM(e){const{username:t,tasks:s}=e,r=document.querySelectorAll(`[data-user="${t}"]`);for(let n of r)n.remove();this.renderTaskCount()}}I=new WeakMap;function O(o,e,t,s=!1){return{message:o.replace("{user}",e).replace("{message}",t),error:s}}function oe(o){return o.broadcaster||o.mod}function M(o){return parseInt(o,10)-1}function j({username:o,userColor:e}){const t=document.createElement("div");t.classList.add("card"),t.dataset.user=o;const s=document.createElement("div");s.classList.add("username"),s.innerText=o,s.style.color=configs.settings.showUsernameColor?e:"",t.appendChild(s);const r=document.createElement("ol");return r.classList.add("tasks"),t.appendChild(r),t}function ae(o){const e={command:null,parameters:null,source:null,tags:null};let t=0,s=null,r=null,n=null,a=null;if(o[t]==="@"){let c=o.indexOf(" ");s=o.slice(1,c),t=c+1}if(o[t]===":"){t+=1;let c=o.indexOf(" ",t);r=o.slice(t,c),t=c+1}let i=o.indexOf(":",t);return i===-1&&(i=o.length),n=o.slice(t,i).trim(),i!==o.length&&(t=i+1,a=o.slice(t)),e.command=ie(n),e.command===null?null:(s!==null&&(e.tags=ce(s)),e.source=le(r),e.parameters=a,a&&a[0]==="!"&&(e.command=de(a,e.command)),e)}function ie(o){let e=null;const t=o.split(" ");switch(t[0]){case"JOIN":case"PART":case"NOTICE":case"CLEARCHAT":case"HOSTTARGET":case"PRIVMSG":e={command:t[0],channel:t[1]};break;case"PING":e={command:t[0]};break;case"CAP":e={command:t[0],isCapRequestEnabled:t[2]==="ACK"};break;case"GLOBALUSERSTATE":e={command:t[0]};break;case"USERSTATE":case"ROOMSTATE":e={command:t[0],channel:t[1]};break;case"RECONNECT":e={command:t[0]};break;case"421":return console.error(`Unsupported IRC command: ${t[2]}`),null;case"001":e={command:t[0]};break;case"002":case"003":case"004":case"353":case"366":case"372":case"375":case"376":return null;default:return console.log(`Unexpected command: ${t[0]}`),null}return e}function ce(o){const e={"client-nonce":null,flags:null};let t={};return o.split(";").forEach(r=>{let n=r.split("="),a=n[1]===""?null:n[1];switch(n[0]){case"badges":case"badge-info":if(a){let c={};a.split(",").forEach(g=>{let d=g.split("/");c[d[0]]=d[1]}),t[n[0]]=c}else t[n[0]]=null;break;case"emotes":if(a){let c={};a.split("/").forEach(g=>{let d=g.split(":"),k=[];d[1].split(",").forEach(C=>{let h=C.split("-");k.push({startPosition:h[0],endPosition:h[1]})}),c[d[0]]=k}),t[n[0]]=c}else t[n[0]]=null;break;case"emote-sets":let i=a.split(",");t[n[0]]=i;break;default:e.hasOwnProperty(n[0])||(t[n[0]]=a)}}),t}function le(o){if(o==null)return null;{let e=o.split("!");return{nick:e.length==2?e[0]:null,host:e.length==2?e[1]:e[0]}}}function de(o,e){let s=o.slice(0+1).trim(),r=s.indexOf(" ");return r===-1?(e.botCommand=s.slice(0),e.botCommandParams=""):(e.botCommand=s.slice(0,r),e.botCommandParams=s.slice(r).trim()),e}class ue{constructor(){this.events=new Map}on(e,t){this.events.has(e)||this.events.set(e,[]),this.events.get(e).push(t)}emit(e,...t){this.events.has(e)&&this.events.get(e).forEach(s=>s(...t))}off(e,t){if(this.events.has(e)){const s=this.events.get(e),r=s.indexOf(t);r!==-1&&(s.splice(r,1),s.length===0&&this.events.delete(e))}}once(e,t){const s=(...r)=>{t(...r),this.off(e,s)};this.on(e,s)}}class me extends ue{constructor({username:t,authToken:s,channel:r}){super();w(this,q);w(this,F);w(this,p,null);w(this,D,{0:"CONNECTING",1:"OPEN",2:"CLOSING",3:"CLOSED"});w(this,b,0);this.username=t.toLowerCase(),this.channel=`#${r.toLowerCase()}`,this.authToken=s}connect(t="ws://irc-ws.chat.twitch.tv:80"){U(this,p,new WebSocket(t)),l(this,p).onopen=()=>{console.log("Authenticating with Twitch IRC server..."),l(this,p).send("CAP REQ :twitch.tv/tags twitch.tv/commands"),l(this,p).send(`PASS ${this.authToken}`),l(this,p).send(`NICK ${this.username}`)},l(this,p).onerror=s=>(console.error("An error occurred while attempting to establish a WebSocket connect",s),s),l(this,p).onmessage=s=>{E(this,q,_).call(this,s.data)},l(this,p).onclose=s=>{switch(s.code){case 1e3:console.log("Connection closed normally.");break;case 1006:console.error(`Connection dropped. Reconnecting in ${l(this,b)} milliseconds...`);let r=l(this,b);setTimeout(()=>{this.connect()},r),U(this,b,l(this,b)===0?1e3:l(this,b)*2);break;case 1012:console.log("Switching  servers..."),this.connect();break;default:console.error(`Unhandled code: ${s.code}. Reason: ${s.reason}`)}}}say(t,s){if(l(this,p).readyState===WebSocket.OPEN){const n=[s?`@reply-parent-msg-id=${s}`:"","PRIVMSG",this.channel,`:${t}`].join(" ").trim();l(this,p).send(n)}else console.error("Connection is not open")}disconnect(t=1e3,s=""){E(this,F,z).call(this)==="OPEN"&&l(this,p).close(t,s)}}p=new WeakMap,D=new WeakMap,b=new WeakMap,q=new WeakSet,_=function(t){t.trim().split(`\r
`).forEach(r=>{const n=ae(r);if(n)switch(n.command.command){case"PRIVMSG":if(n.parameters.startsWith("!")){const a=he(n);this.emit("command",a)}break;case"PING":l(this,p).send("PONG "+n.parameters);break;case"001":l(this,p).send(`JOIN ${this.channel}`);break;case"JOIN":console.log(`Joined ${this.channel}`),U(this,b,0);break;case"RECONNECT":this.disconnect(1012,"The Twitch IRC server is terminating the connection for maintenance reasons.");break;case"PART":console.error("The channel must have banned (/ban) the bot."),l(this,p).close();break;case"NOTICE":n.parameters==="Login authentication failed"?(console.error(`Authentication failed; left #${this.channel}`),l(this,p).send(`PART ${this.channel}`)):n.parameters==="You don't have permission to perform that action"&&(console.error(`No permission. Check if the access token is still valid. Left ${this.channel}`),l(this,p).send(`PART ${this.channel}`));break}})},F=new WeakSet,z=function(){return l(this,D)[l(this,p).readyState]};function he(o){var e,t;return{user:o.tags["display-name"],command:o.command.botCommand,message:o.command.botCommandParams||"",flags:{broadcaster:!!((e=o.tags.badges)!=null&&e.broadcaster),mod:!!((t=o.tags.badges)!=null&&t.moderator)},extra:{userColor:o.tags.color,messageId:o.tags.id}}}function pe(o){o.emit("command",{user:"adminUser",command:"clearList",message:"",flags:{broadcaster:!0,mod:!1},extra:{userColor:"#FF0000",messageId:`${H()}`}});const e=["red","coral","springGreen","lightSeaGreen","slateBlue","hotpink","violet","orange","darkTurquoise","dodgerblue","blueviolet"],{maxTasksPerUser:t}=configs.settings;for(let s=1;s<=8;s++){const r=`Username${s}`,n=e[s-1];for(let a=0;a<t;a++){const i={user:r,command:"taskadd",message:`test task description ${a===2?"with longer text for example":""}`,flags:{broadcaster:!0,mod:!1},extra:{userColor:n,messageId:`${H()}`}};setTimeout(()=>{o.emit("command",i)},1e3*s+a*100)}setTimeout(()=>{const a={user:r,command:"taskdone",message:"1",flags:{broadcaster:!0,mod:!1},extra:{userColor:n,messageId:`${H()}`}};o.emit("command",a)},1e3*s+1e4)}}function H(){return`${Math.floor(Math.random()*1e9)}`}const{auth:{twitch_channel:fe,twitch_oauth:ke,twitch_username:Te},settings:{testMode:Y}}=configs,P=new me({username:Te,authToken:ke,channel:fe});window.addEventListener("load",()=>{let o="userList";Y&&(console.log("Test mode enabled"),o="testUserList");const e=new ne(o);e.render(),P.on("command",t=>{const{user:s,command:r,message:n,flags:a,extra:i}=t,c=e.chatHandler(s,r,n,a,i);c.error?console.error(c.message):P.say(c.message,i.messageId)}),P.connect(),Y&&pe(P)})})();
