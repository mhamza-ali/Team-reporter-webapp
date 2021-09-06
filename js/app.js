// FOr Adding Data on local storage
function createteamdatastore() {
    let userindex = localStorage.getItem("userindex");
    // console.log(userindex);
    var signupdata = JSON.parse(localStorage.getItem("persons")) || [];
    var adminName = signupdata[userindex].name;
    var adminEmail = signupdata[userindex].email;

    let teamnameinput = document.getElementById('teamnameinput').value;
    let teamcatogeryinput = document.getElementById('teamcatogeryinput').value;
    let memberemailinput = document.getElementById('memberemailinput').value;
    let commaseprate = memberemailinput.split(',')
    // console.log(commaseprate);
    var d = new Date();
    var n = d.getTime()
    var questionarr = [];
    let person = {
        adminEmail: adminEmail,
        adminName: adminName,
        teamname: teamnameinput,
        category: teamcatogeryinput,
        members: commaseprate,
        question: questionarr,
        teamkey: n,
    };

    if ((teamnameinput.length && memberemailinput.length) > 0) {
        if (memberemailinput.indexOf(" ") == -1) {
            if (memberemailinput.charAt(memberemailinput.length - 1) !== ",") {
                if (memberemailinput.indexOf(",,") == -1) {
                    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
                    teamdata[userindex].createdteam.push(person);
                    localStorage.setItem("persons", JSON.stringify(teamdata));
                    swal("Team Created", "Add more member If you want", "success");
                    createteam();
                    document.getElementById("teamnameinput").value = "";
                    document.getElementById("teamcatogeryinput").value = "";
                    document.getElementById("memberemailinput").value = "";
                } else {
                    swal("More Than one Comma (,) is not Allow")
                }
            } else {
                swal("You Enter (,) in the last, Its Not Allow")
            }
        } else {
            swal("Member Filed Cannot contain Any Empty Space")
        }
    } else {
        swal("Please Input first");
    }
    // if(memberemailinput.length == 0){
    //     console.log("adasd");
    // }
};

// adding member 
// function addmember() {
//     let memberemailinput = document.getElementById('memberemailinput').value;
//     console.log(memberemailinput);
//     document.getElementById('memberemailinput').value = "";
// }

// Create Team 
function createteam() {
    let userindex = localStorage.getItem("userindex")
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let html = '';
    let createElement = document.getElementById('createElement');
    if (teamdata[userindex].createdteam.length == 0) {
        createElement.innerHTML = `<p style="font-size:16px; text-align: center; margin: 20px 0px 20px 0px">
                                    No Team Created. Click on (+) Icon to Create Your Team <hr></p>`
    } else {

        teamdata[userindex].createdteam.forEach((item, index) => {

            // var test = item.members;


            //? index jis team k andar email add hua he
            //? personindex jis user me email mila he

            teamdata.forEach((personitem, personindex) => {
                for (var i = 0; i < item.members.length; i++) {
                    if (item.members[i] == personitem.email) {

                        // forpartteam(index, personindex);

                    }
                    // else{
                    //     console.log("no");
                    // }
                }
                // console.log(personitem.email, item.members);
            })


            if (item.members.length == 1) {
                var members = item.members[0];
            } else if (item.members.length == 0) {
                var members = "Not added yet"
            }
            else {
                var members = item.members[0] + ", " + item.members[1] + " & " + `<b> ${(item.members.length - 2)} </b>` + " Other"
            }
            let teamname = item.teamname;
            let capitializaTeamname = (teamname.charAt(0).toUpperCase() + teamname.slice(1));

            html += `<fieldset class="myteam fw-normal text-start">
                    <div class="myteamcontent">
                        <p class="teamname">${capitializaTeamname}</p>
                        <hr>
                        <i> <p class="member">Members:</p></i>
                        <div class="d-flex justify-content-between">
                            <ul class="teammember" id="memberlist">
                            ${members} 
                            </ul>
                            <div class="text-center">
                            <i onclick="editteam(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  style="cursor: pointer;" class="bi bi-pencil-square pe-2"></i>
                            <i onclick="settingteam(${index})" class="bi bi-gear-fill" style="cursor: pointer;"></i>
                            </div>
                        </div>
                        
                        <hr>
                        <p class="teammember"><b>Category:</b> ${item.category}</p>
                    </div>
                    
                </fieldset>`
        });

        createElement.innerHTML = html;
    }
}

// editteam
function editteam(index) {
    let userindex = localStorage.getItem("userindex");

    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let createteamid = document.getElementById('createteamid');
    let editteambutton = document.getElementById('editteambutton');

    document.getElementById('teamnameinput').value = teamdata[userindex].createdteam[index].teamname;
    document.getElementById('teamcatogeryinput').value = teamdata[userindex].createdteam[index].category;
    document.getElementById('memberemailinput').value = teamdata[userindex].createdteam[index].members;
    // console.log(teamdata[index].email);
    createteamid.style.display = "none";
    editteambutton.style.display = "block";

    let hiddeninput = document.getElementById('hiddeninput');
    // console.log(index);
    hiddeninput.value = index;
    console.log(teamdata[userindex].createdteam[index].teamname);
}

function saveeditteam() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let hiddeninput = document.getElementById('hiddeninput').value;

    var existingadminName = teamdata[userindex].createdteam[hiddeninput].adminName;
    var existingadminEmail = teamdata[userindex].createdteam[hiddeninput].adminEmail;
    var existingteamkey = teamdata[userindex].createdteam[hiddeninput].teamkey;

    let teamnameinput = document.getElementById('teamnameinput').value;
    let teamcatogeryinput = document.getElementById('teamcatogeryinput').value;
    let memberemailinput = document.getElementById('memberemailinput').value;
    let commaseprate = memberemailinput.split(',');

    var arr = teamdata[userindex].createdteam[hiddeninput].question;
    let person = {
        adminEmail: existingadminEmail,
        adminName: existingadminName,
        teamname: teamnameinput,
        category: teamcatogeryinput,
        members: commaseprate,
        question: arr,
        teamkey: existingteamkey,
    };

    if ((teamnameinput.length && memberemailinput.length) > 0) {
        if (memberemailinput.indexOf(" ") == -1) {
            if (memberemailinput.charAt(memberemailinput.length - 1) !== ",") {
                if (memberemailinput.indexOf(",,") == -1) {
                    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
                    teamdata[userindex].createdteam[hiddeninput] = person;
                    localStorage.setItem("persons", JSON.stringify(teamdata));
                } else {
                    swal("More Than one Comma (,) is not Allow")
                }
            } else {
                swal("You Enter (,) in the last, Its Not Allow")
            }
        } else {
            swal("Member Filed Cannot contain Any Empty Space")
        }
    } else {
        swal("Empty Field Not Allowed")
    }
    createteam();
}

// Deleteall
function deleteall() {
    let userindex = localStorage.getItem("userindex");

    var person = []
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    teamdata[userindex].createdteam = person;
    localStorage.setItem("persons", JSON.stringify(teamdata));
    createteam();
}

function showinputmodalbox() {
    let createteamid = document.getElementById('createteamid');
    let editteambutton = document.getElementById('editteambutton');
    document.getElementById('teamnameinput').value = "";
    document.getElementById('teamcatogeryinput').value = "";
    document.getElementById('memberemailinput').value = "";
    editteambutton.style.display = "none"
    createteamid.style.display = "block"
};

function settingteam(index) {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    let teamname = teamdata[userindex].createdteam[index].teamname;
    let category = teamdata[userindex].createdteam[index].category;
    let members = teamdata[userindex].createdteam[index].members;

    sessionStorage.setItem("teamname", teamname);
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("members", JSON.stringify(members));
    sessionStorage.setItem("settingteamindex", index);

    window.location.href = "./teamowner.html"
}

function logout() {
    localStorage.removeItem("userindex");
    function preventBack() { window.history.forward(); }
    setTimeout("preventBack()", 0);
    window.onload = function () { null };
    window.location.href = "./login.html"
}










// function forpartteam(index, personindex) {
//     let userindex = localStorage.getItem("userindex");

//     let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
//     let partteamkey = teamdata[userindex].createdteam[index].teamkey;

//     //? index jis team k andar email add hua he
//     //? personindex jis user me email mila he
//     console.log("yes", index, personindex);
//     // localStorage.setItem("personmatchindex", personindex);
//     // console.log(teamdata[index].partteam.length);
//     let flag = false;
//     if (teamdata[index].partteam.length > 0) {
//     for (var i = 0; i < teamdata[index].partteam.length; i++) {
        
//             console.log(teamdata[index].partteam[i].teamkey);
//             var check = teamdata[index].partteam[i].teamkey;
//             if (check == partteamkey) {
//                 flag = true;
//                 console.log("Already");
//             }
//         }
//     }
//     if (flag == false) {
//         console.log("Nahi he chala do");
//         let partteamname = teamdata[userindex].createdteam[index].teamname;
//         let partteamategory = teamdata[userindex].createdteam[index].category;
//         let partteammember = teamdata[userindex].createdteam[index].members;
//         let partteamadminEmail = teamdata[userindex].createdteam[index].adminEmail;
//         let partteamadminName = teamdata[userindex].createdteam[index].adminName;
//         let partteamquestion = teamdata[userindex].createdteam[index].question;
//         let person = {
//             adminEmail: partteamadminEmail,
//             adminName: partteamadminName,
//             teamname: partteamname,
//             category: partteamategory,
//             members: partteammember,
//             question: partteamquestion,
//             teamkey: partteamkey,
//         };

//         teamdata[personindex].partteam.push(person)
//         localStorage.setItem("persons", JSON.stringify(teamdata));
//     }

// }


















// function partteamshow() {
//     let userindex = localStorage.getItem("userindex")
//     let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
//     let partteamhtml = '';
//     let partteamElement = document.getElementById('partteamElement');

//     teamdata[userindex].partteam.forEach((item, index) => {

//         if (item.members.length == 1) {
//             var members = item.members[0];
//         } else if (item.members.length == 0) {
//             var members = "Not added yet"
//         }
//         else {
//             var members = item.members[0] + ", " + item.members[1] + " & " + `<b> ${(item.members.length - 2)} </b>` + " Other"
//         }
//         let teamname = item.teamname;
//         let capitializaTeamname = (teamname.charAt(0).toUpperCase() + teamname.slice(1));

//         partteamhtml += `<fieldset class="myteam fw-normal text-start">
//                     <div class="myteamcontent">
//                         <p class="teamname">${capitializaTeamname}</p>
//                         <hr>
//                         <i> <p class="member">Members:</p></i>
//                         <div class="d-flex justify-content-between">
//                             <ul class="teammember" id="memberlist">
//                             ${members}
//                             </ul>
//                         </div>
                        
//                         <hr>
//                         <p class="teammember"><b>Category:</b> ${item.category}</p>
//                         <p class="teammember"><b>Admin Name:</b> ${item.adminName}</p>
//                         <p class="teammember"><b>Admin Email:</b> ${item.adminEmail}</p>
//                     </div>
//                 </fieldset>`
//     });

//     partteamElement.innerHTML = partteamhtml;
// }