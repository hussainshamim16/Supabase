import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nbzlxxpoaoozjmlthbgm.supabase.co";
let ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iemx4eHBvYW9vemptbHRoYmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDI1NzMsImV4cCI6MjA3ODk3ODU3M30.asMOEZ9Sa5RAum0DMQ1XasN8c8lzXBpqZKEwF2NW9aA";


const supabase = createClient(SUPABASE_URL, ANON_KEY);

async function getUsers() {
    const { data, error } = await supabase
        .from("Student Data")
        .select("*");

    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
}

getUsers();



// document.getElementById("studentForm").addEventListener("submit", function (e) {
//     e.preventDefault()

//     const resData = new FormData(this)
//     const studentObject = {
//         ST_NAME: resData.get("name"),
//         ST_EMAIL: resData.get("email"),
//         ST_AGE: resData.get("age"),
//         ST_CLASS: resData.get("class"),
//         ST_DOB: resData.get("dob"),
//     }
//     console.log("submit", studentObject)
// })