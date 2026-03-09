# API & Logic Mapping

## 🔌 Core Endpoints
| Feature | PHP Endpoint | React Hook |
| :--- | :--- | :--- |
| **Auth** | `api/middleware/auth.php` | `useAuth.ts` (Pending) |
| **Attendance** | `api/users/get_my_attendance.php` | `useAttendance.ts` |
| **Disputes** | `api/users/file_dispute.php` | `useRequests.ts -> fileDispute` |
| **Overtime** | `api/users/file_overtime.php` | `useRequests.ts -> fileOvertime` |
| **Leave** | `api/users/file_leave.php` | `useRequests.ts -> fileLeave` |

## 🧠 Business Rules (Frontend)
1. **Lunch Deduction Rule:** `Total Hours = (TimeOut - TimeIn) - 1` if duration > 5 hours.
2. **Status Machine:**
   - `Pending`: No manager action.
   - `Endorsed`: Coach-approved (Role 2).
   - `Approved`: Admin-finalized (Role 3).
3. **Role Visibility:**
   - `role_id >= 2`: Show "Management" nav section.
   - `role_id >= 3`: Show "Master Attendance" and "Final Approvals".
