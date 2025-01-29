import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "tksen46a",
  dataset: "production",
  token: "skENJuHp0EQWkzUttPUdSgiUtjGWXuK3oBVfwbjIICIXGrz41howma7zh0Jqz99tuBchKZ6CiNC8gcr3w1aPxwM4FAd9CtihfpVr3vfKfr6ReJ2N4xYk4MIFBGYbdQgCNVOo906r36hKtfbltnqPyB2nRCjbx9ac9Rh8LJ1yeO8remEoPo4S"
})