# HRIS Attendance Module: UI Table Visualizations & Sample Data

This document provides a "Low-Fidelity" preview of how the Ant Design tables will look when populated with data from `dtfj_system_hris_db.sql`.

---

## 1. Employee View: "My Attendance Log"
**Goal:** Individual tracking. (Clockify Style: Simple, clean rows).

| Date | Time In | Time Out | Total Hours | Status (Tag) | Attendance | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 06 Mar 2026 | 08:02 AM | --:-- -- | -- | `[ Late ]` (Orange) | `●` Present | [ Dispute ] |
| 05 Mar 2026 | 07:55 AM | 05:05 PM | 9.10h | `[ On Time ]` (Green) | `●` Present | [ View ] |
| 04 Mar 2026 | 08:15 AM | 05:30 PM | 8.25h | `[ Late ]` (Orange) | `●` Present | [ View ] |
| 03 Mar 2026 | --:-- -- | --:-- -- | 0.00h | `[ Absent ]` (Red) | `●` Absent | [ Dispute ] |
| 02 Mar 2026 | 08:00 AM | 05:00 PM | 8.00h | `[ On Time ]` (Green) | `○` On Leave | [ View ] |

---

## 2. Team Coach View: "Endorsement Queue" (Stage 1)
**Goal:** Supervising the cluster. Coach checks `agreement_1`.

| Employee | Request Type | Date Range | Reason | Agreement 1 | Status | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **John Doe** | Sick Leave | Mar 07 - Mar 08 | Severe Flu | `[ ]` (Check) | `Pending` | [ Endorse ] [ Deny ] |
| **Jane Smith** | Regular OT | Mar 06 (2hrs) | Project Deadline | `[X]` | `Endorsed` | [ Undo ] |
| **Mark Lee** | VL | Mar 10 - Mar 15 | Family Vacation | `[ ]` | `Pending` | [ Endorse ] [ Deny ] |
| **Sarah Tan** | Dispute | Mar 03 | Forgot to log out | `[X]` | `Endorsed` | [ Undo ] |

---

## 3. Admin View: "Final Approval Dashboard" (Stage 2)
**Goal:** HR/Admin final sign-off. Admin checks `agreement_2`.

| Employee | Cluster | Request | Endorsed By | Agreement 2 | Final Status | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Jane Smith | Alpha | Regular OT | Coach Mike | `[ ]` (Check) | `Endorsed` | [ Approve ] [ Deny ] |
| Sarah Tan | Beta | Dispute | Coach Dave | `[X]` | `Approved` | [ History ] |
| John Doe | Alpha | Sick Leave | Coach Mike | `[ ]` | `Endorsed` | [ Approve ] [ Deny ] |

---

## 4. Master Attendance Log (Admin/Super Admin)
**Goal:** Company-wide visibility and payroll preparation.

| ID | Name | Cluster | Date | Shift | Total Hrs | Log Tag | Setup |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 101 | **John Doe** | Alpha | Mar 06 | Morning | 0.00 | `Late` | `Onsite` |
| 102 | **Jane Smith** | Alpha | Mar 06 | Morning | 8.00 | `On Time` | `WFH` |
| 105 | **Sarah Tan** | Beta | Mar 06 | Mid | 4.50 | `Break` | `Hybrid` |
| 109 | **Mike Ross** | Gamma | Mar 05 | Night | 10.00 | `Overtime` | `Onsite` |

---

## 5. Holiday & Schedule Configuration
**Goal:** Simple CRUD for system constants.

| Holiday Name | Date | Type | Status |
| :--- | :--- | :--- | :--- |
| Maundy Thursday | Apr 02, 2026 | Regular | `Upcoming` |
| Good Friday | Apr 03, 2026 | Regular | `Upcoming` |
| Labor Day | May 01, 2026 | Regular | `Scheduled` |

---

## UI Component Summary (Ant Design)
- **Bold Text:** `Typography.Link` or `Typography.Text strong`.
- **Checkboxes:** Mapping to `agreement_1` and `agreement_2` (Stage 1 & 2 approvals).
- **Status Pills:** AntD `<Tag color="...">`.
- **Action Buttons:** `Button type="primary" size="small"` (Ghost or Link variant for dense tables).
