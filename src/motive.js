const motivationMessages = {
    1: [ // Monday
        "New week, new bugs! But hey, coffee exists for a reason. Let’s roll. 🐞☕",
        "Another Monday. May your WiFi be strong and meetings be short. 💪📶",
        "Fresh bugs, fresh coffee. It’s Monday, let’s act surprised. ☕🐛",
        "Monday again? Who keeps restarting this simulation?! 🤯"
    ],
    2: [ // Tuesday
        "Still not Friday, but at least it’s not Monday. Tiny wins count too!",
        "Tuesday: basically Monday's sequel. Let's keep the crash logs clean.",
        "Tuesday blues? Console.log your feelings. You’ll feel better.",
        "You made it to Tuesday! Productivity not guaranteed. 😴"
    ],
    3: [ // Wednesday
        "Halfway through! If your code survived till now, so can you. 🧠💻",
        "It’s Wednesday! Time to pretend we’re on schedule. 😅",
        "Wednesday — break the code or break through it. Pick one!",
        "Wednesday! If bugs had birthdays, today would be the celebration. 🎂🐞"
    ],
    4: [ // Thursday
        "Just one more push. Even servers don’t crash this often. Stay up!",
        "Thursday... so close yet still not close enough. Hold strong!",
        "Almost there. Fake energy till it’s Friday! 🔋",
        "Thursday: the official 'I can smell Friday' day."
    ],
    5: [ // Friday
        "One day to go! You’ve debugged worse, you got this. Weekend is waving! 🏁",
        "Friday! You survived. Pretend you're working and coast to freedom. 😎",
        "Friday mode: activated. Minimal tasks, max vibes. 🎉",
        "It’s Friday! Deploy nothing. Touch nothing. Just smile. 😌"
    ]
};

export function getMotivationMessage(date = new Date()) {
    const weekday = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    if (weekday === 0 || weekday === 6) return "It's the weekend! Go touch grass. 🌿";

    const dayCount = Math.floor(date.getDate() / 7); // rotate messages per week
    const messages = motivationMessages[weekday];
    return messages[dayCount % messages.length];
}
