//! ZeroClaw 默认成员配置。

use super::registry::{TerminalDefaultMemberConfig, TerminalPostReadyPlan};

pub(crate) const ZEROCLAW_DEFAULT_MEMBER: TerminalDefaultMemberConfig =
    TerminalDefaultMemberConfig {
        id: "zeroclaw",
        terminal_type: "zeroclaw",
        default_command: "zeroclaw",
        unlimited_access_flag: None,
        resume_command_template: None,
        post_ready_plan: TerminalPostReadyPlan {
            post_ready_steps: &[
                super::ai_shared::AI_ONBOARDING_STEP,
            ],
        },
    };
