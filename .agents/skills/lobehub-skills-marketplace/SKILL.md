---
name: lobehub-skills-marketplace
description: Interact with the LobeHub Skills Marketplace (lobehub.com/skills) to search, install, publish, and manage agent skills using @lobehub/market-cli and SKILL.md standard.
---

# LobeHub Skills Marketplace Integration

This skill enables AI agents (including Antigravity) to discover, install, update, and manage agent capabilities from the LobeHub Skills Marketplace (https://lobehub.com/skills).

## 🚀 Setup & Overview

The LobeHub Skills Marketplace is an open registry for agent skills defined by the `SKILL.md` standard. All installed skills reside in `.agents/skills/` within your workspace and are automatically loaded by Antigravity.

## 🛠️ CLI Operations

### 1. Search for Skills
Search the LobeHub marketplace for available skills:
```bash
cmd /c npx -y @lobehub/market-cli skills search --q <keyword>
```

### 2. Install a Skill
Install a skill directly into `.agents/skills/`:
```bash
cmd /c npx -y @lobehub/market-cli skills install <skill-identifier>
```

### 3. Initialize a New Skill
Create a new skill template following the LobeHub `SKILL.md` standard:
```bash
cmd /c npx -y @lobehub/market-cli skills init <skill-name>
```

### 4. Review & Rate a Skill
Leave feedback for community skills:
```bash
cmd /c npx -y @lobehub/market-cli skills comment <skill-id> -c "<feedback>" --rating 5
```

## 📄 SKILL.md Standard Format

Skills are stored in `.agents/skills/<skill-name>/SKILL.md`:

```markdown
---
name: skill-name
description: Clear, action-oriented description of what the skill enables.
---

# Skill Title

Step-by-step instructions, CLI commands, or domain rules for the agent.
```
