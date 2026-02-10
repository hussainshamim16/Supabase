// ===============================
// 1️⃣ Supabase Library Import
// ===============================

// Supabase client import (CDN se)
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// ===============================
// 2️⃣ Supabase Project Credentials
// ===============================

// Supabase project ka URL
const SUPABASE_URL = "https://nbzlxxpoaoozjmlthbgm.supabase.co";

// Supabase ka public (anon) key
let ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iemx4eHBvYW9vemptbHRoYmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDI1NzMsImV4cCI6MjA3ODk3ODU3M30.asMOEZ9Sa5RAum0DMQ1XasN8c8lzXBpqZKEwF2NW9aA";


// ===============================
// 3️⃣ Supabase Client Creation
// ===============================

// Supabase ke sath project connect karna
const supabase = createClient(SUPABASE_URL, ANON_KEY);


// ===============================
// 4️⃣ FETCH / READ DATA FUNCTION
// ===============================

// Table se saara data lana
async function getUsers() {

    // "Student Data" table se select query
    const { data, error } = await supabase
        .from("Student Data")
        .select("*");

    // Agar error aaye
    if (error) {
        console.error("Fetch Error:", error);
    }
    // Agar data mil jaye
    else {
        console.log("All Students:", data);
    }
}

// Page load par data fetch
getUsers();


// ===============================
// 5️⃣ INSERT DATA (FORM SUBMIT)
// ===============================

// Form submit event
document.getElementById("studentForm").addEventListener("submit", async function (e) {

    // Page reload hone se rokna
    e.preventDefault()

    // Form ka data lena
    const resData = new FormData(this)

    // Supabase table ke columns ke mutabiq object banana
    const studentObject = {
        St_Name: resData.get("name"),
        St_Email: resData.get("email"),
        St_Age: resData.get("age"),
        St_Class: resData.get("class"),
        St_Dob: resData.get("dob"),
    }

    console.log("Submit Data:", studentObject)

    // Supabase me data insert karna
    const { data, error } = await supabase
        .from("Student Data")
        .insert([studentObject]) // ⚠️ hamesha array me insert hota hai

    // Agar insert fail ho
    if (error) {
        console.error("Insert Error:", error.message)
        alert("Insert failed ❌")
        return
    }

    // Insert success
    alert("Data inserted successfully ✅")
    getUsers(); // updated list dobara fetch
})


// ===============================
// 6️⃣ UPDATE DATA FUNCTION
// ===============================

let update = async () => {

    // User se ID lena
    let userId = prompt("Enter Student ID to Update", "1")

    // New name lena
    let userName = prompt("Enter New Name", "Ali")

    // Supabase update query
    const { data, error } = await supabase
        .from("Student Data")
        .update({ St_Name: userName })   // konsa column update karna
        .eq("id", Number(userId))        // kis row ka (WHERE id = ?)
        .select()                        // updated row return karne ke liye

    // Agar update fail ho
    if (error) {
        console.error("Update Error:", error.message)
        alert("Update failed ❌")
        return
    }

    // Update success
    alert("Data updated successfully ✅")
    getUsers()
}

// Console / button se call karne ke liye
window.update = update


// ===============================
// 7️⃣ DELETE DATA FUNCTION
// ===============================

let deleteUser = async () => {

    // User se ID lena
    let userId = prompt("Enter Student ID to Delete", "1")

    // Supabase delete query
    const { error } = await supabase
        .from("Student Data")
        .delete()
        .eq("id", Number(userId)) // jis row ki id match ho

    // Agar delete fail ho
    if (error) {
        console.error("Delete Error:", error.message)
        alert("Delete failed ❌")
        return
    }

    // Delete success
    alert("Data deleted successfully 🗑️")
    getUsers()
}

// Console / button se call karne ke liye
window.deleteUser = deleteUser

// ======================================= crud khtam
// ======================================= Auth start
// ================= SIGN UP =================
document
    .getElementById("signupForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault()
        // form submit par page reload hone se roknay ke liye

        const formData = new FormData(this)
        // poore form ka data utha liya (email, password)

        const email = formData.get("email")
        const password = formData.get("password")
        // form ke inputs se values nikaal li

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        // Supabase ko kaha: is email & password se naya user banao

        if (error) {
            alert(error.message)
            // agar koi error aaye (email already hai, weak password etc)
            return
        }

        alert("Signup successful ✅")
        // user successfully create ho gaya

        console.log(data)
        // signup ka response (user + session info)
    })

// ================= LOGIN =================
document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault()
        // page reload rokna

        const formData = new FormData(this)
        const email = formData.get("email")
        const password = formData.get("password")
        // login form se email & password lena

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        // Supabase se check karwana ke user sahi hai ya nahi

        if (error) {
            alert(error.message)
            // agar password ya email ghalat ho
            return
        }

        alert("Login successful 🎉")
        // user login ho chuka hai

        console.log(data.user)
        // yahan logged-in user ki info hoti hai
    })

// ================= LOGOUT =================
async function logout() {
    const { error } = await supabase.auth.signOut()
    // current user ka session khatam kar deta hai

    if (error) {
        alert(error.message)
        return
    }

    alert("Logged out 👋")
    // user successfully logout
}

// function ko global banana taake HTML se call ho sakay
window.logout = logout



// Supabase automatically yaad rakhta hai ke kaunsa user login hai,
// hum sirf us se poochte hain: bhai user hai ya nahi?


//  ye dono kaam supabase khud hei karey ga 

// Page load par User check (MOST IMPORTANT)
async function checkUser() {
    const { data: { user }, } = await supabase.auth.getUser()

    if (user) {
        console.log("User login hai:", user.email)
        // yahan tum dashboard dikha sakte ho
    } else {
        console.log("Koi user login nahi")
        // yahan login page dikhao
    }
}
window.checkUser = checkUser
checkUser()


// Auth state listener (REAL-TIME TRACKING)
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth event:", event)

    if (event === "SIGNED_IN") {
        console.log("User login hua:", session.user.email)
    }

    if (event === "SIGNED_OUT") {
        console.log("User logout ho gaya")
    }
})
