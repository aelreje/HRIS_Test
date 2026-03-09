# HRIS Attendance Module: UI Architectural Mapping & Design Specification

**Design Philosophy:** Clockify-inspired (Data-dense, clean borders, high-contrast status indicators).
**Component Library:** Ant Design (v5+).
**Primary Logic:** Role-based access control (RBAC) with a two-stage approval workflow (`Endorsement` -> `Final Approval`).

---

## 1. Global Design Tokens (Ant Design Mapping)

| Data Type | UI Element | Ant Design Mapping | Logic / Colors |
| :--- | :--- | :--- | :--- |
| **Attendance Status** | `attendance_status` | `<Badge />` | `Present` (Success), `Absent` (Error), `Late` (Warning), `On Leave` (Default) |
| **Log Tags** | `time_logs.tag` | `<Tag />` | `On Time` (Green), `Late` (Orange), `Absent` (Red), `Break` (Cyan) |
| **Approval Status** | `status` | `<Tag />` | `Pending` (Processing), `Endorsed` (Blue), `Approved` (Green), `Denied` (Red) |
| **Work Setup** | `work_setup` | `<Segmented />` | `Onsite`, `WFH`, `Hybrid` |

---

## 2. Employee View: "My Time & Requests"
*Focus: Personal accountability and frictionless time logging.*

### A. Time Tracker Header (Clockify Style)
A sticky top-bar allowing real-time interaction.
- **Components:** `Input.Group`, `Typography.Text` (Timer), `Button`.
- **Logic:** 
  - If `time_out` is NULL for today, show **"Time Out"** (Danger Button).
  - Else, show **"Time In"** (Primary Button).
  - Fields: `time_logs.time_in`, `time_logs.tag`.

### B. Personal Attendance Table
- **Component:** `<Table />` (Size: `middle`, `bordered`).
- **Columns:**
  - `log_date`: Format `DD MMM YYYY`.
  - `time_in` / `time_out`: Format `hh:mm A`.
  - `total_hours`: Calculated decimal (e.g., `8.50h`).
  - `tag`: AntD `<Tag />` based on `time_logs.tag`.
  - `Action`: `<Button type="link">` to file a `dispute`.

### C. Request Drawer
- **Component:** `<Drawer />` containing `<Tabs />`.
- **Tabs:** 
  - `Leave`: Form mapping to `leave_requests`.
  - `Overtime`: Form mapping to `overtime_requests`.
  - `Dispute`: Form mapping to `attendance_disputes`.
- **Key Fields:** `reason`, `start_date`, `end_date`.

---

## 3. Team Coach View: "Cluster Supervision"
*Focus: Managing the `cluster_members` and the first stage of approvals.*

### A. Team Status Dashboard
- **Component:** `<Card />` Grid.
- **Logic:** Queries `time_logs` where `time_out` IS NULL and `user_id` is in the Coach's cluster.
- **Display:** Member Name, "Clocked in at [time]", Work Setup (Onsite/WFH).

### B. Endorsement Queue (Stage 1 Approval)
- **Component:** `<Table />` with Row Selection.
- **Logic:** Filter `leave_requests` and `overtime_requests` where `status = 'Pending'`.
- **Interaction:** Coach sets `agreement_1 = 1` and `status = 'Endorsed'`.
- **AntD Elements:** 
  - `<Popconfirm />` for quick "Deny" actions.
  - `<Tooltip />` to view `reason` or `remarks`.

---

## 4. Admin View: "System Operations"
*Focus: Final approval, company-wide logs, and master data.*

### A. Master Attendance Log
- **Component:** `<Table />` with advanced filtering (`Table.Summary` for total payroll hours).
- **Filters:** By Cluster, By Employee Type, By Date Range.
- **Data:** Joined view of `employees`, `attendance_logs`, and `time_logs`.

### B. Final Approval Module (Stage 2)
- **Logic:** Filter requests where `status = 'Endorsed'`.
- **Action:** Admin sets `agreement_2 = 1` and `status = 'Approved'`.
- **Fields Updated:** `approved_by`, `remarks`.

### C. Configuration Forms
- **Holidays:** `<Calendar />` or `<Table />` management for the `holidays` table.
- **Schedules:** `<TimePicker.RangePicker />` for managing `start_time` and `end_time` in `schedules`.

---

## 5. Super Admin View: "System Audit"
*Focus: Security and system integrity.*

### A. Activity Stream
- **Component:** `<Timeline />` or `<Table />`.
- **Source:** `activity_logs`.
- **Data:** `user_id` (Actor), `action` (e.g., "Deleted Attendance"), `target`, `created_at`.

### B. Role & Permission Matrix
- **Component:** `<Checkbox.Group />` inside a `<Table />`.
- **Source:** `role_permissions` and `user_permissions`.

---

## 6. Technical Implementation Details (Figma -> Code)

- **Layout:** Use Ant Design `<Layout />` with a `Sider` for navigation and a `Content` area with a grey background (`#f5f5f5`) to make the white Cards/Tables pop (Clockify Aesthetic).
- **Modals:** Use `<Modal />` for creating new records (e.g., adding a holiday).
- **Drawers:** Use `<Drawer />` for viewing "Details" (e.g., clicking a specific log to see the audit trail).
- **Validation:** Use `Form.useForm` with `rules` for all request submissions to ensure `reason` and `date` are never null.
