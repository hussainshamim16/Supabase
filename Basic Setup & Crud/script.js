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
let ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";


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
