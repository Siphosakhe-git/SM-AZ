// String formart => userid/useremail::action::confid/confname::role::attributes@confOrg=org1,org2/null/null

export function MakeCoference(confName, confOrganisers, confAreachairs, confReviewers, confAuthors, confMode) {
    const clientSocket = io('ws://localhost:8080')

    var confOrg = "confOrg="
    if (confOrganisers.length == 0)
    {
        confOrg = "/null"
    }
    else
    {
        for (var i = 0; i < confOrganisers.length; i++) {
            if (i < confOrganisers.length - 1) {
                confOrg = confOrg + confOrganisers[i] + ","
            }
            else
            {
                confOrg = confOrg + confOrganisers[i]
            }
        }
    }

    var confAch = "/confAch="
    if (confAreachairs.length == 0)
    {
        confAch = "/null"
    }
    else
    {
        for (var i = 0; i < confAreachairs.length; i++) {
            if (i < confAreachairs.length - 1) {
                confAch = confAch + confAreachairs[i] + ","
            }
            else
            {
                confAch = confAch + confAreachairs[i]
            }
        }
    }

    var confRev = "/confRev="
    if (confReviewers.length == 0)
    {
        confRev = "/null"
    }
    else
    {
        for (var i = 0; i < confReviewers.length; i++) {
            if (i < confReviewers.length - 1) {
                confRev = confRev + confReviewers[i] + ","
            }
            else
            {
                confRev = confRev + confReviewers[i]
            }
        }
    }

    var confAth = "/confAth="
    if (confAuthors.length == 0)
    {
        confAth = "/null"
    }
    else
    {
        for (var i = 0; i < confAuthors.length; i++) {
            if (i < confAuthors.length - 1) {
                confAth = confAth + confAuthors[i] + ","
            }
            else
            {
                confAth = confAth + confAuthors[i]
            }
        }
    }
    console.log("47::MakeConference::" + confName.toString() + "::admin::attributes@" + confOrg + confAch + confRev + confAth + "/confMode=" + confMode.toString())
    clientSocket.emit("request message", "47::MakeConference::" + confName.toString() + "::admin::attributes@" + confOrg + confAch + confRev + confAth + "/confMode=" + confMode.toString() + "\r\n")

    clientSocket.on("conference created")
    {
        document.querySelector("#homeCreateConfModalBody").innerHTML = "Conference created successfully"
    }
}
export function GetConference(confId)
{
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", "null::GetConference::" + confId.toString() + "::null::null")

    clientSocket.on("confData received", (JSONConfData) => {
        clientSocket.disconnect()
        console.log("In the GetConference method")
        window.open('http://localhost:8081/conference', '_top')
    })
}
export function DeleteConference(confId)
{
    var clientSocket = CreateSocketConnection()

    console.log("null::DeleteConference::" + confId.toString() + "::admin::null")
    clientSocket.write("null::DeleteConference::" + confId.toString() + "::admin::null\r\n")
}
export function AddMember(userId, confId, confOrganiser)
{
    var clientSocket = CreateSocketConnection()

    var confOrg = ""
    for (var i = 0; i < confOrganiser.length; i++) {
        if (i != confOrganiser.length - 1) {
            confOrg = confOrg + confOrganiser[i] + ","
        } else {
            confOrg = confOrg + confOrganiser[i]
        }
    }
    console.log(userId.toString() + "::AddOrganiser::" + confId.toString() + "::admin::attributes@confOrg=" + confOrg + "/null")
    clientSocket.write(userId.toString() + "::AddOrganiser::" + confId.toString() + "::admin::attributes@confOrg=" + confOrg + "/null\r\n")
}
export function RemoveMember(userId, confId)
{
    var clientSocket = CreateSocketConnection()

    console.log(userId.toString() + "::RemoveMember::" + confId.toString() + "::null::null")
    clientSocket.write(userId.toString() + "::RemoveMember::" + confId.toString() + "::null::null\r\n")
}
export function Login(email, pword)
{
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", email + "::Login::null::null::null")

    clientSocket.on("send pword", (data) => {
        clientSocket.emit('client pword', pword)
        console.log("pword emitted: " + pword)
    })

    clientSocket.on("incorrect pword or email", (JSONUserData) => {
        clientSocket.disconnect()
    })

    clientSocket.on("logged in", (JSONUserData) => {
        clientSocket.disconnect()
        window.open('http://localhost:8081/home', '_top')
    })
}
export function Signup(name, email, pword, expertise, domian)
{
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", "null::Signup::null::null::null")

    clientSocket.on("send signup details", () => {
        // Signup details string => name :: email :: pword :: expertise1,expertise2 :: domain1,domain2
        clientSocket.emit("signup details", name + "::" + email + "::" + pword + "::" + expertise +  "::" +  domian)
        console.log("signup details sent")
    })

    clientSocket.on('signup successful', () => {
        clientSocket.disconnect()
        const template = document.createElement("template")
        template.innerHTML = "<p>You have successfully signedup</p>".trim()
        document.body.appendChild(template.content.firstElementChild)

        window.open('http://localhost:8081/home', '_top')
    })
}
export function GetAllUsers()
{
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", "null::GetAllUsers::null::null::null")

    clientSocket.on('allusers', data => {
        // allUsers = JSON.parse(data.toString().split("<<")[1])
        // localStorage.setItem("allusers", data.toString())
    })
}
export function GetUserData(userId)
{
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", userId.toString() +"::GetUserData::null::null::null")
}
export function SendFile(userId, byteData) {
    const clientSocket = io('ws://localhost:8080')

    clientSocket.emit("request message", userId.toString() +"::UploadFile::null::null::null")

    clientSocket.on("send file", () => {
        console.log(byteData)
        clientSocket.emit("my file", byteData)
    })
}
export var allUsers = "text"

