
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const resData = new FormData(this)
    const studentObject = {
        ST_NAME: resData.get("name"),
        ST_EMAIL: resData.get("email"),
        ST_AGE: resData.get("age"),
        ST_CLASS: resData.get("class"),
        ST_DOB: resData.get("dob"),
    }


    console.log("submit", studentObject)
})

console.log(supabase.createClient)



let project_id = "nbzlxxpoaoozjmlthbgm"
let SUPABASE_URL = "https://nbzlxxpoaoozjmlthbgm.supabase.co"
let Anon_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iemx4eHBvYW9vemptbHRoYmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDI1NzMsImV4cCI6MjA3ODk3ODU3M30.asMOEZ9Sa5RAum0DMQ1XasN8c8lzXBpqZKEwF2NW9aA";
// create supabAse connection
const supabase = supabase.createClient(SUPABASE_URL, Anon_Key)