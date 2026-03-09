# Workflow & Functional References

Use these command patterns to maintain and extend the project effectively.

### ⚡ Functional References
1. Run `/init` to bootstrap your `Claude.md` **$foundation$** next time you start a session.
2. Write a `Skill` the next time you **$repeat$** yourself (Example: `figma-mcp-connector`).
3. Add a `Hook` the next time you want **$guardrails$** for your API data logic.
4. Create a `Sub-agent` when you need **$isolation$** for a complex logic refactor.
5. Connect an `MCP Server` the next time you need **$external$** **$data$** from Figma or GitHub.

### 🛠️ Common Task Patterns
- **Adding a Component:** `v0` (Design) -> `Figma MCP` (Sync) -> `Tailwind` (Styling).
- **Connecting an API:** Update `api/` (PHP) -> Add to `useRequests.ts` (Hook) -> Implement in component.
- **Fixing Builds:** Run `npm run build` locally before pushing to catch TypeScript/Linting errors.
