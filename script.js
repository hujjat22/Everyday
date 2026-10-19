const firebaseConfig = {
  apiKey: "AIzaSyAwGStX_l3lYOo2-9JT6dXZi6FWgWmiLd0",
  authDomain: "everyday-d18d7.firebaseapp.com",
  projectId: "everyday-d18d7",
  storageBucket: "everyday-d18d7.firebasestorage.app",
  messagingSenderId: "947679919385",
  appId: "1:947679919385:web:a8c03040bb053a641a5988",
  measurementId: "G-40R9L8Q7M9"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const serviceWorkerRegistrationPromise =
navigator.serviceWorker.register("./firebase-messaging-sw.js");
const nameForm = document.getElementById("name-form");
const welcomeScreen = document.getElementById("welcome-screen");
const notificationScreen = document.getElementById("notification-screen");
const nameInput = document.getElementById("visitor-name");

const skipButton = document.getElementById("skip-notifications");
const allowButton = document.getElementById("allow-notifications");

const homeScreen = document.getElementById("home-screen");
const greeting = document.getElementById("greeting");
const messageText = document.getElementById("message-text");
const messageAuthor = document.getElementById("message-author");
const anotherMessageButton = document.getElementById("another-message");


// Add the other 353 quotes here, 20 at a time.
// Each quote needs text and author.
const messages = [
    { text: "Don't wait for confidence to start; it often comes after.", author: "Everyday" },
{ text: "Ask what someone meant instead of guessing.", author: "Everyday" },
{ text: "Missing a day is a pause, not a verdict.", author: "Everyday" },
{ text: "Make the task smaller until you can begin.", author: "Everyday" },
{ text: "Being available all the time isn't the same as caring.", author: "Everyday" },
{ text: "If a plan keeps failing, try changing the plan.", author: "Everyday" },
{ text: "You don't have to turn every interest into a career.", author: "Everyday" },
{ text: "You can say, “I need time to think.”", author: "Everyday" },
{ text: "Your first try is allowed to be awkward.", author: "Everyday" },
{ text: "Your next step matters more than a perfect timeline.", author: "Everyday" },
{ text: "Ask whether someone wants advice or just a listener.", author: "Everyday" },
{ text: "Keep your standards, and leave room to learn.", author: "Everyday" },
{ text: "One bad result can teach you; it can't define you.", author: "Everyday" },
{ text: "You can miss someone and still know distance is right.", author: "Everyday" },
{ text: "Save your work before you close the laptop.", author: "Everyday" },
{ text: "A small habit works best when it fits your real day.", author: "Everyday" },
{ text: "Wait until you're calm before replying in anger.", author: "Everyday" },
{ text: "Being wrong feels uncomfortable; learning from it helps.", author: "Everyday" },
{ text: "Rest before you're running on empty.", author: "Everyday" },
{ text: "Give your work attention, not insults about yourself.", author: "Everyday" },
{ text: "Comparing your everyday life to someone's highlight reel is bad math.", author: "Everyday" },
{ text: "You can be grateful and still want things to change.", author: "Everyday" },
{ text: "Don't promise more than you can give.", author: "Everyday" },
{ text: "A kind no is clearer than a resentful yes.", author: "Everyday" },
{ text: "You don't have to be the loudest person in the room.", author: "Everyday" },
{ text: "When you're stuck, explain the problem in one sentence.", author: "Everyday" },
{ text: "Everyday you wake up, Allah has a plan for you.", author: "Everyday" },
{ text: "You can begin before you feel ready.", author: "Everyday" },
{ text: "Give yourself the patience you'd give a good friend.", author: "Everyday" },
{ text: "Your pace can change when life changes.", author: "Everyday" },
{ text: "When asking for feedback, ask about one specific thing.", author: "Everyday" },
{ text: "You don't have to earn time for fun.", author: "Everyday" },
{ text: "Give your attention to what matters most right now.", author: "Everyday" },
{ text: "Hard doesn't automatically mean wrong.", author: "Everyday" },
{ text: "You can keep some parts of your life private.", author: "Everyday" },
{ text: "Take useful feedback; leave the disrespect.", author: "Everyday" },
{ text: "A pause can save you from a message you'll regret.", author: "Everyday" },
{ text: "You are enough.", author: "Everyday" },
{ text: "Being busy and moving forward aren't always the same.", author: "Everyday" },
{ text: "You can appreciate someone without copying their life.", author: "Everyday" },
{ text: "When you make a mistake, focus on how to fix it.", author: "Everyday" },
{ text: "You're allowed to change your mind when you learn more.", author: "Everyday" },
{ text: "Step away from the screen when your thoughts feel crowded.", author: "Everyday" },
{ text: "The people you trust should be able to hear an honest answer.", author: "Everyday" },
{ text: "You can work toward big goals and still protect your sleep.", author: "Everyday" },
{ text: "A quiet win still counts.", author: "Everyday" },
{ text: "Put your energy into what you can change.", author: "Everyday" },
{ text: "Being new is temporary; staying curious helps.", author: "Everyday" },
{ text: "One hard day doesn't have to become a hard week.", author: "Everyday" },
{ text: "Notice which conversations help you feel like yourself.", author: "Everyday" },
{ text: "আজ সব কাজ শেষ না হলেও, একটা কাজ শেষ করো।", author: "Everyday" },
{ text: "দেরিতে উত্তর এলে নিজের মূল্য নিয়ে সন্দেহ কোরো না।", author: "Everyday" },
{ text: "ভুল বুঝলে ধরে নিও না—জিজ্ঞেস করো।", author: "Everyday" },
{ text: "নিজের সীমা জানানো সম্পর্ক নষ্ট করা নয়।", author: "Everyday" },
{ text: "শুরুটা ছোট হলে কাজ শুরু করা সহজ হয়।", author: "Everyday" },
{ text: "রাগের সময় পাঠানো মেসেজটা আরেকবার পড়ে নাও।", author: "Everyday" },
{ text: "বিশ্রাম নিতে একেবারে ক্লান্ত হয়ে যাওয়া পর্যন্ত অপেক্ষা কোরো না।", author: "Everyday" },
{ text: "সব পরামর্শ তোমার জন্য নয়—কোনটা কাজে লাগবে বেছে নাও।", author: "Everyday" },
{ text: "কারও সাফল্য দেখে নিজের পথ বদলাতে হবে না।", author: "Everyday" },
{ text: "আজকের কঠিন দিনটাই তোমার পুরো জীবন নয়।", author: "Everyday" },
    { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "One child, one teacher, one book, and one pen can change the world.", author: "Malala Yousafzai" },
    { text: "Culture does not make people, people make culture.", author: "Chimamanda Ngozi Adichie" },
    { text: "It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all.", author: "J.K. Rowling" },
    { text: "Each of us is more than the worst thing we've ever done.", author: "Bryan Stevenson" },
    { text: "The real hum is joy. The real hum is love.", author: "Shonda Rhimes" },
    { text: "It's the little things citizens do. That's what will make the difference.", author: "Wangari Maathai" },
    { text: "Don't be daunted. Just do your job. Continue to show up.", author: "Elizabeth Gilbert" },
    { text: "You need a lot of bad ideas in order to get a few good ones.", author: "Adam Grant" },
    { text: "The world is waking up and change is coming whether you like it or not.", author: "Greta Thunberg" },
    { text: "We can't practice compassion with other people if we can't treat ourselves kindly.", author: "Brené Brown" },
    { text: "There is no charm equal to tenderness of heart.", author: "Jane Austen" },
    { text: "If there is no struggle, there is no progress.", author: "Frederick Douglass" },
    { text: "Tell me, what is it you plan to do with your one wild and precious life?", author: "Mary Oliver" },
    { text: "Hold fast to dreams\nFor if dreams die\nLife is a broken-winged bird\nThat cannot fly.", author: "Langston Hughes" },
    { text: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson" },
    { text: "There are years that ask questions, and years that answer.", author: "Zora Neale Hurston" },
    { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
    { text: "Change will not come if we wait for some other person or some other time.", author: "Barack Obama" },
    { text: "Make good art.", author: "Neil Gaiman" },
    { text: "The most obvious, important realities are often the ones that are hardest to see and talk about.", author: "David Foster Wallace" },
    { text: "How wonderful it is that nobody need wait a single moment before starting to improve the world!", author: "Anne Frank" },
    { text: "Be not afraid of greatness.", author: "William Shakespeare" },
    { text: "Caring for myself is not self-indulgence. It is self-preservation, and that is an act of political warfare.", author: "Audre Lorde" },
    { text: "How lovely it is, this thing we have done—together.", author: "Toni Morrison" },
    { text: "The first hope in our inventory must be the hope that love is going to have the last word.", author: "Martin Luther King Jr." },
    { text: "What you do makes a difference, and you have to decide what kind of difference you want to make.", author: "Jane Goodall" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "I have to remind myself to trust in my craft.", author: "Amanda Gorman" },
    { text: "But still, like dust, I'll rise.", author: "Maya Angelou" },
    { text: "Black love is Black wealth.", author: "Nikki Giovanni" },
    { text: "When you want something, all the universe conspires in helping you to achieve it.", author: "Paulo Coelho" },
    { text: "Life is not primarily a quest for pleasure ... but a quest for meaning.", author: "Viktor Frankl" },
    { text: "The imagination is our most useful tool, and it's most useful when it isn't taken literally!", author: "Ursula K. Le Guin" },
    { text: "You have to have insane confidence in yourself, even if it's not real.", author: "Mindy Kaling" },
    { text: "Build resilient communities. Be there for your friends and family.", author: "Sheryl Sandberg" },
    { text: "Even in our blackest moment, we have to acknowledge that there is something very fine in human beings.", author: "Eleanor Roosevelt" },
    { text: "Success isn't about how much money you make. It's about the difference you make in people's lives.", author: "Michelle Obama" },
    { text: "Dreaming leads to thinking; thinking provides knowledge; knowledge leads you to work hard, which in turn makes you great.", author: "A.P.J. Abdul Kalam" },
    { text: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির", author: "রবীন্দ্রনাথ ঠাকুর" },
    { text: "আকাশভরা সূর্য-তারা, বিশ্বভরা প্রাণ", author: "রবীন্দ্রনাথ ঠাকুর" },
    { text: "যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।", author: "রবীন্দ্রনাথ ঠাকুর" },
    { text: "বল বীর—বল উন্নত মম শির!", author: "কাজী নজরুল ইসলাম" },
    { text: "মানুষ ভজলে সোনার মানুষ হবি।", author: "লালন" },
    { text: "I am no bird; and no net ensnares me; I am a free human being with an independent will.", author: "Charlotte Brontë" },
    { text: "Not everything that is faced can be changed; but nothing can be changed until it is faced.", author: "James Baldwin" },
    { text: "All that you touch you Change. All that you Change changes you. The only lasting truth is Change.", author: "Octavia E. Butler" },
    { text: "Look again at that dot. That's here. That's home. That's us.", author: "Carl Sagan" },
    { text: "If liberty means anything at all, it means the right to tell people what they do not want to hear.", author: "George Orwell" },
    { text: "There is no gate, no lock, no bolt that you can set upon the freedom of my mind.", author: "Virginia Woolf" },
    { text: "The only way to get rid of a temptation is to yield to it.", author: "Oscar Wilde" },
    { text: "It is when you give of yourself that you truly give.", author: "Kahlil Gibran" },
    { text: "No feeling is final.", author: "Rainer Maria Rilke" },
    { text: "Be kind whenever possible; it is always possible.", author: "The Dalai Lama" },
    // Quotes 1–10
{ text: "Discomfort is the price of admission to a meaningful life.", author: "Susan David" },
{ text: "Err in the direction of kindness.", author: "George Saunders" },
{ text: "And now that you don't have to be perfect, you can be good.", author: "John Steinbeck" },
{ text: "Beware; for I am fearless, and therefore powerful.", author: "Mary Shelley" },
{ text: "What is the point of being alive if you don't at least try to do something remarkable?", author: "John Green" },
{ text: "Love is an action, never simply a feeling.", author: "bell hooks" },
{ text: "I must not fear. Fear is the mind-killer.", author: "Frank Herbert" },
{ text: "A word after a word after a word is power.", author: "Margaret Atwood" },
{ text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
{ text: "It's no use going back to yesterday, because I was a different person then.", author: "Lewis Carroll" },

// Quotes 11–20
{ text: "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.", author: "Samuel Beckett" },
{ text: "If you have built castles in the air, your work need not be lost. Now put the foundations under them.", author: "Henry David Thoreau" },
{ text: "No one is useless in this world who lightens the burden of it for any one else.", author: "Charles Dickens" },
{ text: "Well done is better than well said.", author: "Benjamin Franklin" },
{ text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" },
{ text: "Courage, dear heart.", author: "C.S. Lewis" },
{ text: "The goal is not to be perfect by the end. The goal is to be better today.", author: "Simon Sinek" },
{ text: "If a story moves you, act on it.", author: "Sisonke Msimang" },
{ text: "You are constantly becoming a new person.", author: "Shankar Vedantam" },
{ text: "The good news is you don't need to be brilliant to be wise.", author: "Barry Schwartz" },

// Quotes 21–30
{ text: "Sometimes we are responsible for something not because we're to blame but because we're the only ones who can change it.", author: "Lisa Feldman Barrett" },
{ text: "Instead of asking about the facts of someone's life, we should ask them how they feel about their life.", author: "Charles Duhigg" },
{ text: "There's something inside you that made you keep trying despite everyone who told you to quit.", author: "Jonny Sun" },
{ text: "Our lives will only ever always continue to be a balancing act that has less to do with pain and more to do with beauty.", author: "Shane Koyczan" },
{ text: "Education does not change the world. Education changes people. People change the world.", author: "Paulo Freire" },
{ text: "A dream you dream alone is only a dream. A dream you dream together is reality.", author: "Yoko Ono" },
{ text: "I exist as I am, that is enough.", author: "Walt Whitman" },
{ text: "Education is our passport to the future, for tomorrow belongs only to the people who prepare for it today.", author: "Malcolm X" },
{ text: "Look for the helpers. You will always find people who are helping.", author: "Fred Rogers, quoting his mother" },
{ text: "Here is the world. Beautiful and terrible things will happen. Don't be afraid.", author: "Frederick Buechner" },

// Quotes 31–40
{ text: "Get in good trouble, necessary trouble.", author: "John Lewis" },
{ text: "The best way out is always through.", author: "Robert Frost" },
{ text: "How you love yourself is how you teach others to love you.", author: "Rupi Kaur" },
{ text: "Knowing is not enough; we must apply. Willing is not enough; we must do.", author: "Johann Wolfgang von Goethe" },
{ text: "The opposite of love is not hate, but indifference.", author: "Elie Wiesel" },
{ text: "Self-education is, I firmly believe, the only kind of education there is.", author: "Isaac Asimov" },
{ text: "Experience is not what happens to a man; it is what a man does with what happens to him.", author: "Aldous Huxley" },
{ text: "What do we live for, if it is not to make life less difficult to each other?", author: "George Eliot" },
{ text: "The greatest thing in the world is to know how to belong to oneself.", author: "Michel de Montaigne" },
{ text: "Courage is resistance to fear, mastery of fear—not absence of fear.", author: "Mark Twain" },

// Quotes 41–50
{ text: "The ability to love better is a skill we can all build and improve on over time.", author: "Katie Hood" },
{ text: "We underestimate the power of our own generous actions.", author: "Asha Curran" },
{ text: "Is what I'm doing helping or harming me?", author: "Lucy Hone" },
{ text: "If we do, we not only overestimate them, we underestimate ourselves.", author: "Anil Seth" },
{ text: "There's nothing wrong with you. What you are is a multipotentialite.", author: "Emilie Wapnick" },
{ text: "Can you fake it till you make it?", author: "Amy Cuddy" },
{ text: "My routine is not to have a routine.", author: "Harlan Coben" },
{ text: "The currency of love is attention.", author: "Anne Morriss" },
{ text: "We over-rationalize the past, over-dramatize the present and underestimate the future.", author: "Alexander Stubb" },
{ text: "Kindness is a choice.", author: "Tallie Nikitchyuk" },
    { text: "The brick walls are there to give us a chance to show how badly we want something.", author: "Randy Pausch" },
    { text: "Work hard, be kind, and amazing things will happen.", author: "Conan O'Brien" },
    { text: "Women belong in all places where decisions are being made.", author: "Ruth Bader Ginsburg" },
    { text: "How we spend our days is, of course, how we spend our lives.", author: "Annie Dillard" },
    { text: "Another world is not only possible, she is on her way. On a quiet day, I can hear her breathing.", author: "Arundhati Roy" },
    { text: "In the middle of winter I at last discovered that there was in me an invincible summer.", author: "Albert Camus" },
    { text: "Attention is the rarest and purest form of generosity.", author: "Simone Weil" },
    { text: "The clearest way into the Universe is through a forest wilderness.", author: "John Muir" },
    { text: "Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts.", author: "Rachel Carson" },
    { text: "Before you tell your life what you intend to do with it, listen for what it intends to do with you.", author: "Parker Palmer" },
    { text: "It does not take genius. It takes diligence.", author: "Atul Gawande" },
    { text: "There’s zero correlation between being the best talker and having the best ideas.", author: "Susan Cain" },
    { text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.", author: "Alan Turing" },
    { text: "Never be limited by other people's limited imaginations.", author: "Mae Jemison" },
    { text: "It ain't over till it's over.", author: "Yogi Berra" },
    { text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.", author: "Antoine de Saint-Exupéry" },
    { text: "Above all, don't lie to yourself.", author: "Fyodor Dostoevsky" },
    { text: "Life can only be understood backwards; but it must be lived forwards.", author: "Søren Kierkegaard" },
    { text: "Because you are alive, everything is possible.", author: "Thich Nhat Hanh" },
    { text: "Nothing ever goes away until it has taught us what we need to know.", author: "Pema Chödrön" },
    { text: "You're braver than you believe, stronger than you seem, and smarter than you think.", author: "A. A. Milne" },
    { text: "To know what you know and what you do not know, that is true knowledge.", author: "Confucius" },
    { text: "However difficult life may seem, there is always something you can do, and succeed at.", author: "Stephen Hawking" },
    { text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Never be ashamed of trying. Effortlessness is a myth.", author: "Taylor Swift" },
    { text: "Find a group of people who challenge and inspire you, and spend a lot of time with them, and it will change your life.", author: "Amy Poehler" },
    { text: "Your imagination is the single most valuable thing you will take into this world.", author: "Phil Lord and Chris Miller" },
    { text: "Every failed experiment is one step closer to success.", author: "Denzel Washington" },
    { text: "Whatever has happened to you in your past has no power over this present moment, because life is now.", author: "Oprah Winfrey" },
    { text: "Since no one else is crazy enough to do it, you have little competition.", author: "Larry Page" },
    { text: "Be comfortable with imperfection.", author: "Reshma Saujani" },
    { text: "We think too much and feel too little.", author: "Charlie Chaplin" },
    { text: "Listen as fiercely as you want to be heard.", author: "Kristen Bell" },
    { text: "I write entirely to find out what I'm thinking, what I'm looking at, what I see and what it means.", author: "Joan Didion" },
    { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R. R. Martin" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "Adapt what is useful, reject what is useless, and add what is specifically your own.", author: "Bruce Lee" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.", author: "George Bernard Shaw" },
    { text: "You can't stop the waves, but you can learn to surf.", author: "Jon Kabat-Zinn" },
    { text: "The question of what you want to own is actually the question of how you want to live your life.", author: "Marie Kondo" },
    { text: "Disability only becomes a tragedy when society fails to provide the things we need to lead our lives.", author: "Judith Heumann" },
    { text: "I am only one, but still I am one. I cannot do everything, but still I can do something.", author: "Edward Everett Hale" },
    { text: "In the beginner's mind there are many possibilities, but in the expert's there are few.", author: "Shunryu Suzuki" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
    { text: "The scariest moment is always just before you start.", author: "Stephen King" },
    { text: "I learned very early the difference between knowing the name of something and knowing something.", author: "Richard Feynman" },
    { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
    // 1–10
{ text: "If you're not prepared to be wrong, you'll never come up with anything original.", author: "Sir Ken Robinson" },
{ text: "Do your best. But like it!", author: "Katherine Johnson" },
{ text: "Knowledge is power. Information is liberating.", author: "Kofi Annan" },
{ text: "A wealth of information creates a poverty of attention.", author: "Herbert A. Simon" },
{ text: "The thing that is really hard, and really amazing, is giving up on being perfect and beginning the work of becoming yourself.", author: "Anna Quindlen" },
{ text: "The role of the artist is to make the revolution irresistible.", author: "Toni Cade Bambara" },
{ text: "I am different, not less.", author: "Temple Grandin" },
{ text: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker" },
{ text: "The truth will set you free, but first it will piss you off.", author: "Gloria Steinem" },
{ text: "Hope is a state of mind, not of the world.", author: "Václav Havel" },

// 11–20
{ text: "The struggle of man against power is the struggle of memory against forgetting.", author: "Milan Kundera" },
{ text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
{ text: "Freedom is what you do with what's been done to you.", author: "Jean-Paul Sartre" },
{ text: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.", author: "Marcel Proust" },
{ text: "Don't ask where I'm from; ask where I'm a local.", author: "Taiye Selasi" },
{ text: "No matter where you're from, your dreams are valid.", author: "Lupita Nyong'o" },
{ text: "The ability to be alone is the condition for the ability to love.", author: "Erich Fromm" },
{ text: "Act as if what you do makes a difference. It does.", author: "William James" },
{ text: "Becoming is better than being.", author: "Carol S. Dweck" },
{ text: "Human beings are works in progress who mistakenly think they're finished.", author: "Daniel Gilbert" },

// 21–30
{ text: "The question is not why the addiction, but why the pain.", author: "Gabor Maté" },
{ text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
{ text: "A life is not important except in the impact it has on other lives.", author: "Jackie Robinson" },
{ text: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
{ text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
{ text: "I've failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" },
{ text: "I've worked too hard and too long to let anything stand in the way of my goals.", author: "Mia Hamm" },
{ text: "The most important thing is to try and inspire people so that they can be great in whatever they want to do.", author: "Kobe Bryant" },
{ text: "You can't win unless you learn how to lose.", author: "Kareem Abdul-Jabbar" },
{ text: "I don't know where I'm going from here, but I promise it won't be boring.", author: "David Bowie" },

// 31–40
{ text: "Art is for everybody.", author: "Keith Haring" },
{ text: "I found I could say things with color and shapes that I couldn't say any other way.", author: "Georgia O'Keeffe" },
{ text: "A problem is a chance for you to do your best.", author: "Duke Ellington" },
{ text: "Creativity is a habit, and the best creativity is the result of good work habits.", author: "Twyla Tharp" },
{ text: "Fearlessness is like a muscle. The more you exercise it, the more natural it becomes.", author: "Arianna Huffington" },
{ text: "If it scares you, it might be a good thing to try.", author: "Seth Godin" },
{ text: "Live in the future, then build what's missing.", author: "Paul Graham" },
{ text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.", author: "Bill Gates" },
{ text: "Don't be intimidated by what you don't know. That can be your greatest strength.", author: "Sara Blakely" },
{ text: "If you can get people to follow you to the ends of the earth, you are a great leader.", author: "Indra Nooyi" },

// 41–50
{ text: "If you double the number of experiments you do per year, you're going to double your inventiveness.", author: "Jeff Bezos" },
{ text: "The Web is more a social creation than a technical one.", author: "Tim Berners-Lee" },
{ text: "A woman with a voice is by definition a strong woman.", author: "Melinda French Gates" },
{ text: "I don't believe in taking right decisions. I take decisions and then make them right.", author: "Ratan Tata" },
{ text: "I refuse to believe that you cannot be both compassionate and strong.", author: "Jacinda Ardern" },
{ text: "Until we get equality in education, we won't have an equal society.", author: "Sonia Sotomayor" },
{ text: "Creativity is part of human nature.", author: "Ai Weiwei" },
{ text: "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world.", author: "Desmond Tutu" },
{ text: "You can tell whether a man is clever by his answers. You can tell whether he is wise by his questions.", author: "Naguib Mahfouz" },
{ text: "The man dies in all who keep silent in the face of tyranny.", author: "Wole Soyinka" },

// 51–60
{ text: "The truth isn't always beauty, but the hunger for it is.", author: "Nadine Gordimer" },
{ text: "Comfort provides a floor but also a ceiling.", author: "Trevor Noah" },
{ text: "If your dreams do not scare you, they are not big enough.", author: "Ellen Johnson Sirleaf" },
{ text: "One woman's success can help another woman's success.", author: "Shirin Ebadi" },
{ text: "Writing is a way of talking without being interrupted.", author: "Mo Yan" },
{ text: "Weakness and ignorance are not barriers to survival, but arrogance is.", author: "Liu Cixin" },
{ text: "I would like to make a film to tell children, 'It's good to be alive.'", author: "Hayao Miyazaki" },
{ text: "To be an artist means never to avert one's eyes.", author: "Akira Kurosawa" },
{ text: "Memories, even your most precious ones, fade surprisingly quickly.", author: "Kazuo Ishiguro" },
{ text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.", author: "Haruki Murakami" },

// 61–70
{ text: "Nothing can ever happen twice.", author: "Wisława Szymborska" },
{ text: "A delayed answer can still be a good answer.", author: "Kenzaburō Ōe" },
{ text: "It is no measure of health to be well adjusted to a profoundly sick society.", author: "Jiddu Krishnamurti" },
{ text: "Take up one idea. Make that one idea your life.", author: "Swami Vivekananda" },
{ text: "Whether you think you can, or you think you can't, you're right.", author: "Henry Ford" },
{ text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
{ text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
{ text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
{ text: "You have power over your mind—not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
{ text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },

// 71–80
{ text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
{ text: "Example is not the main thing in influencing others. It is the only thing.", author: "Albert Schweitzer" },
{ text: "A mind stretched by a new experience can never go back to its old dimensions.", author: "Oliver Wendell Holmes Sr." },
{ text: "An expert is someone who has made all the mistakes that can be made in a very narrow field.", author: "Niels Bohr" },
{ text: "The most dangerous phrase in the language is, 'We've always done it this way.'", author: "Grace Hopper" },
{ text: "Nothing in life is to be feared; it is only to be understood.", author: "Marie Curie" },
{ text: "Action indeed is the sole medium of expression for ethics.", author: "Jane Addams" },
{ text: "Every moment is an organizing opportunity, every person a potential activist.", author: "Dolores Huerta" },
{ text: "We are the ones we have been waiting for.", author: "June Jordan" },
{ text: "What the people want is very simple: an America as good as its promise.", author: "Barbara Jordan" },

// 81–90
{ text: "I found God in myself and I loved her fiercely.", author: "Ntozake Shange" },
{ text: "The cure for boredom is curiosity. There is no cure for curiosity.", author: "Dorothy Parker" },
{ text: "The curious paradox is that when I accept myself just as I am, then I can change.", author: "Carl Rogers" },
{ text: "What is necessary to change a person is to change their awareness of themselves.", author: "Abraham Maslow" },
{ text: "The most violent element in society is ignorance.", author: "Emma Goldman" },
{ text: "Small acts, when multiplied by millions of people, can transform the world.", author: "Howard Zinn" },
{ text: "Hope is not a lottery ticket you can sit on the sofa and clutch.", author: "Rebecca Solnit" },
{ text: "The past is always tense, the future perfect.", author: "Zadie Smith" },
{ text: "Only those who risk going too far can find out how far they can go.", author: "T. S. Eliot" },
{ text: "If you have knowledge, let others light their candles in it.", author: "Margaret Fuller" },

// 91–100
{ text: "It takes courage to grow up and become who you really are.", author: "E. E. Cummings" },
{ text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
{ text: "It takes a lot of courage to show your dreams to someone else.", author: "Erma Bombeck" },
{ text: "The longer I live, the more beautiful life becomes.", author: "Frank Lloyd Wright" },
{ text: "There is only one of you in all time.", author: "Martha Graham" },
{ text: "Never doubt that a small group of thoughtful, committed citizens can change the world.", author: "Margaret Mead" },
{ text: "You never change things by fighting the existing reality. Build a new model that makes the old one obsolete.", author: "Buckminster Fuller" },
{ text: "The most difficult thing is the decision to act; the rest is merely tenacity.", author: "Amelia Earhart" },
{ text: "I'll tell you what freedom is to me: no fear.", author: "Nina Simone" },
{ text: "It isn't where you came from; it's where you're going that counts.", author: "Ella Fitzgerald" },

// 101–110
{ text: "We all require and want respect, man or woman, black or white.", author: "Aretha Franklin" },
{ text: "Culture is the shared concern of us all.", author: "Yo-Yo Ma" },
{ text: "Find out who you are and do it on purpose.", author: "Dolly Parton" },
{ text: "The most sophisticated people I know have childlike ideas about life.", author: "Jim Henson" },
{ text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
{ text: "Buy less, choose well, make it last.", author: "Vivienne Westwood" },
{ text: "More is more and less is a bore.", author: "Iris Apfel" },
{ text: "Art, in itself, is an attempt to bring order out of chaos.", author: "Stephen Sondheim" },
{ text: "Success is peace of mind, knowing you made the effort to become the best you are capable of becoming.", author: "John Wooden" },
{ text: "The man who can drive himself further once the effort gets painful is the man who will win.", author: "Roger Bannister" },

// 111–120
{ text: "A champion is defined not by their wins but by how they can recover when they fall.", author: "Serena Williams" },
{ text: "I've always believed that if you put in the work, the results will come.", author: "Roger Federer" },
{ text: "I'd rather regret the risks that didn't work out than the chances I didn't take at all.", author: "Simone Biles" },
{ text: "You have to be willing to fail in order to succeed.", author: "Megan Rapinoe" },
{ text: "Don't think about the start of the race; think about the ending.", author: "Usain Bolt" },
{ text: "An understanding of the natural world is a source of great curiosity and fulfillment.", author: "David Attenborough" },
{ text: "Let my dataset change your mindset.", author: "Hans Rosling" },
{ text: "Everyone you will ever meet knows something you don't.", author: "Bill Nye" },
{ text: "The most important thing you can do to fight climate change is talk about it.", author: "Katherine Hayhoe" },
{ text: "The Earth is not a resource; it is our home.", author: "Vandana Shiva" },

// 121–130
{ text: "Every child matters. Every child has rights. Every child is a promise for the future.", author: "Kailash Satyarthi" },
{ text: "When you are despised, you are free.", author: "Nawal El Saadawi" },
{ text: "The power of the people is stronger than the people in power.", author: "Wael Ghonim" },
{ text: "Feeling safe with other people is one of the most important parts of mental health.", author: "Bessel van der Kolk" },
{ text: "The quality of our relationships determines the quality of our lives.", author: "Esther Perel" },
{ text: "The boundary to what we can accept is the boundary to our freedom.", author: "Tara Brach" },
{ text: "Every act of perception is to some degree an act of creation.", author: "Oliver Sacks" },
{ text: "Life is about not knowing, having to change, and making the best of each moment.", author: "Gilda Radner" },
{ text: "Happiness is a warm puppy.", author: "Charles M. Schulz" },
{ text: "Nothing in this world can take the place of persistence.", author: "Calvin Coolidge" },

// 131–138
{ text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
{ text: "Efforts and courage are not enough without purpose and direction.", author: "John F. Kennedy" },
{ text: "Each time a person stands up for an ideal, they send a tiny ripple of hope.", author: "Robert F. Kennedy" },
{ text: "Efficiency is doing things right; effectiveness is doing the right things.", author: "Peter Drucker" },
{ text: "Inside every cynical person, there is a disappointed idealist.", author: "George Carlin" },
{ text: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
{ text: "Never trust a computer you can't throw out a window.", author: "Steve Wozniak" },
{ text: "The only thing that separates women of color from anyone else is opportunity.", author: "Viola Davis" }
    
];

// Your 12 messages. One unused message is chosen each month.
const hujjatMessages = [
    { text: "Why are you a better man tomorrow?", author: "Hujjat" },
    { text: "Don't let anyone decide your worth.", author: "Hujjat" },
    { text: "You become what you hate!", author: "Hujjat" },
    { text: "Don't live in the past, nor in the future!", author: "Hujjat" },
    { text: "Take me back to the night we met!", author: "Hujjat" },
    { text: "Not every friend is a friend!", author: "Hujjat" },
    { text: "No one can save you from yourself.", author: "Hujjat" },
    { text: "The strongest one can be the most fragile one!", author: "Hujjat" },
    { text: "Live for your dream.", author: "Hujjat" },
    { text: "Never ever give up!", author: "Hujjat" },
    { text: "You can achieve anything you want.", author: "Hujjat" },
    { text: "We often hurt the ones who love us the most!", author: "Hujjat" }
];

nameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const visitorName = nameInput.value.trim();
    localStorage.setItem("visitorName", visitorName);

    welcomeScreen.hidden = true;
    notificationScreen.hidden = false;
});

function displayMessage(message) {
    messageText.textContent = message.text;
    messageAuthor.textContent = message.author ? `- ${message.author}` : "";
}

function getRandomUnusedMessage(year) {
    if (messages.length === 0) {
        return null;
    }

    const storageKey = `used-messages-${year}`;
    const usedIndexes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const availableIndexes = messages
        .map(function (message, index) {
            return index;
        })
        .filter(function (index) {
            return !usedIndexes.includes(index);
        });

    // If all messages have been used, choose any message.
    if (availableIndexes.length === 0) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    const randomPosition = Math.floor(Math.random() * availableIndexes.length);
    const chosenIndex = availableIndexes[randomPosition];

    usedIndexes.push(chosenIndex);
    localStorage.setItem(storageKey, JSON.stringify(usedIndexes));

    return messages[chosenIndex];
}

function getRandomUnusedHujjatMessage(year) {
    const storageKey = `used-hujjat-messages-${year}`;
    const usedIndexes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const availableIndexes = hujjatMessages
        .map(function (message, index) {
            return index;
        })
        .filter(function (index) {
            return !usedIndexes.includes(index);
        });

    if (availableIndexes.length === 0) {
        return null;
    }

    const randomPosition = Math.floor(Math.random() * availableIndexes.length);
    const chosenIndex = availableIndexes[randomPosition];

    usedIndexes.push(chosenIndex);
    localStorage.setItem(storageKey, JSON.stringify(usedIndexes));

    return hujjatMessages[chosenIndex];
}

function getTodayKeys() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = String(today.getDate()).padStart(2, "0");
    const monthText = String(month + 1).padStart(2, "0");

    return {
        year: year,
        month: month,
        dateKey: `${year}-${monthText}-${day}`
    };
}

function showTodaysMessage() {
    const dateInfo = getTodayKeys();
    const todayStorageKey = `message-for-${dateInfo.dateKey}`;
    const savedMessage = localStorage.getItem(todayStorageKey);

    // Keep the same message if the visitor opens the site again today.
    if (savedMessage) {
        displayMessage(JSON.parse(savedMessage));
        return;
    }

    const monthsStorageKey = `hujjat-months-${dateInfo.year}`;
    const shownMonths = JSON.parse(
        localStorage.getItem(monthsStorageKey) || "[]"
    );

    // On the first visit of this month, choose one of your unused messages.
    if (!shownMonths.includes(dateInfo.month)) {
        const personalMessage = getRandomUnusedHujjatMessage(dateInfo.year);

        if (personalMessage) {
            shownMonths.push(dateInfo.month);
            localStorage.setItem(monthsStorageKey, JSON.stringify(shownMonths));
            localStorage.setItem(
                todayStorageKey,
                JSON.stringify(personalMessage)
            );

            displayMessage(personalMessage);
            return;
        }
    }

    const dailyMessage = getRandomUnusedMessage(dateInfo.year);

    if (dailyMessage) {
        localStorage.setItem(todayStorageKey, JSON.stringify(dailyMessage));
        displayMessage(dailyMessage);
    } else {
        messageText.textContent = "Your messages will appear here.";
        messageAuthor.textContent = "";
    }
}

function showHomeScreen() {
    notificationScreen.hidden = true;
    homeScreen.hidden = false;

    const savedName = localStorage.getItem("visitorName");
    greeting.textContent = `Hello, ${savedName || "there"}!`;

    showTodaysMessage();
}

function showAnotherMessage() {
    const dateInfo = getTodayKeys();
    const anotherMessage = getRandomUnusedMessage(dateInfo.year);

    if (anotherMessage) {
        const todayStorageKey = `message-for-${dateInfo.dateKey}`;
        localStorage.setItem(todayStorageKey, JSON.stringify(anotherMessage));
        displayMessage(anotherMessage);
    } else {
        messageText.textContent = "Add some messages to the messages list first.";
        messageAuthor.textContent = "";
    }
}

skipButton.addEventListener("click", showHomeScreen);
allowButton.addEventListener("click", async function () {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      showHomeScreen();
      return;
    }

    const registration = await serviceWorkerRegistrationPromise;
    const token = await messaging.getToken({
      vapidKey: "BF26rEwEJraJW_RD8uNJE9cF5rWomxG18TSPRmvi-MbCGeUlfrkKuoA6gpYodp1eN1rt__lMB8i0aCUSBQhWRec",
      serviceWorkerRegistration: registration
    });

    console.log("Notification setup worked.");
    showHomeScreen();
  } catch (error) {
    console.error("Notification setup failed:", error);
    showHomeScreen();
  }
});
anotherMessageButton.addEventListener("click", showAnotherMessage);