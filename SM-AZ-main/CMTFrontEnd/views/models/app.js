import { Signup, Login, GetAllUsers, GetUserData, MakeCoference, GetConference, DeleteConference, RemoveMember, AddMember, SendFile} from './gateway.js'

const refreshBtn = document.querySelector("#refreshBtn")
if (refreshBtn){
    refreshBtn.addEventListener("click", () => {
        console.log(refreshBtn.value)
        console.log("at least something worked")
        GetUserData(refreshBtn.value)
        window.setTimeout(() =>{ window.location.reload() }, 500)
    })
}

const loginBtn = document.querySelector("#loginBtn")
if (loginBtn) {
    loginBtn.addEventListener("click", () =>{
        Login(
            document.querySelector("#loginEmail").value,
            document.querySelector("#loginPword").value
        )
    })
}

const signupSubmitBtn = document.querySelector("#signupSubmitBtn")
if (signupSubmitBtn) {
    signupSubmitBtn.addEventListener("click", () => {
        if (document.querySelector("#signupUserPword").value == document.querySelector("#signupVerifyUserPword").value) {
            Signup(
                document.querySelector("#signupUserName").value,
                document.querySelector("#signupUserEmail").value,
                document.querySelector("#signupUserPword").value,
                document.querySelector("#signupUserExpertise").value,
                document.querySelector("#signupDomain").value
            )
        } else {
            console.log("Your passwords do not match")
        }
    })
}

const homeCreateConfBtn = document.querySelector("#homeCreateConfBtn")
if (homeCreateConfBtn)
{
    homeCreateConfBtn.addEventListener("click", () => {
        console.log("I am clicked")
        console.log(sessionStorage.getItem('organisers'))

        let confName = document.querySelector("#newConferenceName").value
        let confOrganisers = JSON.parse(sessionStorage.getItem('organisers'))
        let confAreachairs = JSON.parse(sessionStorage.getItem('areachairs'))
        let confReviewers = JSON.parse(sessionStorage.getItem('reviewers'))
        let confAuthors = JSON.parse(sessionStorage.getItem('authors'))
        let modes = document.getElementsByName('newConferenceType')

        let confMode
        modes.forEach(radio => {
            if (radio.checked)
            {
                if (radio.value.toString() == "single-blind")
                {
                    confMode = "0"
                }
                else
                {
                    confMode = "1"
                }
            }
        })

        console.log("Making conference and confMode is " + confMode)
        MakeCoference(confName, confOrganisers, confAreachairs, confReviewers, confAuthors, confMode)
    })
}

// const memberSearchBar = document.querySelector("#memberSearchBar")
// memberSearchBar.addEventListener("input", e => {
//     const value = e.target.value
//     console.log(value)
// })

const addMembersBtn = document.querySelector("#addMembersBtn")
if (addMembersBtn)
{
    addMembersBtn.addEventListener("click", () => {
        if (sessionStorage.getItem('organisers') == null)
        {
            console.log("in the sessionStorage loop")
            sessionStorage.setItem("organisers", JSON.stringify([]))
            sessionStorage.setItem("areachairs", JSON.stringify([]))
            sessionStorage.setItem("reviewers", JSON.stringify([]))
            sessionStorage.setItem("authors", JSON.stringify([]))
        }
    })
}

const newConfBtn = document.querySelector("#newConfBtn")
if (newConfBtn)
{
    newConfBtn.addEventListener("click", () => {
        GetAllUsers()
    })
}

const submitFileBtn = document.querySelector("#submitFileBtn")
if (submitFileBtn)
{
    submitFileBtn.addEventListener("click", (e) => {
        e.preventDefault()

        let file = document.querySelector("#formFile").files[0]

        const blob = new Blob([file], {type: file.type})

        var myResults = ""
        blob.arrayBuffer().then((arr) => {
            console.log(arr)

            var myUintArr = new Uint8Array(arr)

            var myUintArrString = myUintArr.toString()
            console.log(myUintArrString)

            var myUintArr2 = buffer.Buffer.from(myUintArrString)

            var arrayBuffer = myUintArr2.buffer

            console.log(arrayBuffer)

            const blob2 = new Blob([arrayBuffer], {type: file.type})

            const href = URL.createObjectURL(blob2)

            const a = Object.assign(document.createElement("a"), {
                href,
                style: "display:none",
                download: "MuanoIsAGenius"
            })

            document.body.appendChild(a)

            a.click()
            URL.revokeObjectURL(href)
        })

        // if (myResults !== "")
        // {
        //     const blob2 = new Blob([myResults], {type: file.type})
        //
        //
        //     const href = URL.createObjectURL(blob2)
        //
        //     const a = Object.assign(document.createElement("a"), {
        //         href,
        //         style: "display:none",
        //         download: "MuanoIsAGenius"
        //     })
        //
        //     document.body.appendChild(a)
        //
        //     a.click()
        //     URL.revokeObjectURL(href)
        // }
        // else
        // {
        //     console.log("myResults is empty")
        // }
    })
}




















