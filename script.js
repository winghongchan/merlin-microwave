let about_dialog = document.getElementById("about-dialog")
let settings_dialog = document.getElementById("settings-dialog")
const storage_permission_checkbox = document.getElementById("storage-permission")

if (localStorage.getItem("my_wattage") != null) // If my_wattage is stored in local storage
{
  storage_permission_checkbox.checked = true
  document.getElementById("my-wattage").value = localStorage.getItem("my_wattage")
}

if ("serviceWorker" in navigator) {
  // P W A !
  navigator.serviceWorker.register("service-worker.js");
}

function calculate_my_duration() {
  let og_duration_unprocessed = document.getElementById("og-duration").value
  let og_wattage = document.getElementById("og-wattage").value
  let my_wattage = document.getElementById("my-wattage").value

  if (og_duration_unprocessed == "" || og_wattage == 0 || my_wattage == 0) {
    return
  }

  let og_duration_min_and_sec = og_duration_unprocessed.split(":")
  let og_duration_in_seconds = og_duration_min_and_sec[0] * 60 + parseInt(og_duration_min_and_sec[1]) // The parseInt makes sure it adds, not concatenates. 

  let my_duration_in_seconds = (og_wattage * og_duration_in_seconds) / my_wattage
  let my_duration_string = `${Math.floor(my_duration_in_seconds / 60)}:${String(Math.round(my_duration_in_seconds % 60)).padStart(2, '0')}`
  document.getElementById("my-duration").value = my_duration_string

  if (storage_permission_checkbox.checked == true) {
    localStorage.setItem("my_wattage", my_wattage)
  }
}

function storage_permission_toggle() {
  // Initializes web storage if turned on, or clears web storage if turned off. 
  if (storage_permission_checkbox.checked == true) {
    localStorage.setItem("my_wattage", document.getElementById("my-wattage").value)
  }
  else if (storage_permission_checkbox.checked == false) {
    localStorage.clear()
  }
}
