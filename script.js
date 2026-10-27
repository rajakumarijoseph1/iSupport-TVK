
(() => {
  "use strict";

  const languageButton = document.getElementById("languageToggle");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".news-card")];
  const noResults = document.getElementById("noResults");
  const dialog = document.getElementById("storyDialog");

  let language = "ta";
  let activeCategory = "all";

  const stories = [
    {
      category: { en: "TVK • DEMO", ta: "TVK • மாதிரி" },
      title: {
        en: "How to follow party announcements responsibly",
        ta: "கட்சி அறிவிப்புகளை எப்படிச் சரிபார்ப்பது?"
      },
      text: {
        en: "When reporting a political announcement, locate the original statement, confirm its date, check whether the wording is complete, and link to the original source. Distinguish confirmed information from claims or speculation.",
        ta: "அரசியல் அறிவிப்பைச் செய்தியாக வெளியிடும்போது, அசல் அறிக்கையைக் கண்டறியவும்; தேதியை உறுதிப்படுத்தவும்; முழுமையான தகவலைச் சரிபார்க்கவும்; மூல ஆதாரத்திற்கான இணைப்பை வழங்கவும். உறுதிப்படுத்தப்பட்ட தகவலையும் கூற்றுகள் அல்லது ஊகங்களையும் தெளிவாகப் பிரிக்கவும்."
      }
    },
    {
      category: { en: "PUBLIC ISSUES • DEMO", ta: "மக்கள் பிரச்சினைகள் • மாதிரி" },
      title: {
        en: "Local issues deserve clear answers",
        ta: "உள்ளூர் பிரச்சினைகளுக்குத் தெளிவான பதில்கள் தேவை"
      },
      text: {
        en: "Good local reporting identifies the affected community, documents the issue, requests responses from relevant authorities, and follows up on promised action. Add the location, date, evidence and original source links to each real report.",
        ta: "தரமான உள்ளூர் செய்தி பாதிக்கப்பட்ட மக்களை அடையாளம் காணும்; பிரச்சினைக்கான ஆதாரங்களைப் பதிவு செய்யும்; சம்பந்தப்பட்ட அதிகாரிகளிடம் பதில் கேட்கும்; அறிவிக்கப்பட்ட நடவடிக்கைகளைத் தொடர்ந்து கண்காணிக்கும். ஒவ்வொரு உண்மையான செய்தியிலும் இடம், தேதி, ஆதாரங்கள் மற்றும் மூல இணைப்புகளைச் சேர்க்கவும்."
      }
    },
    {
      category: { en: "POLICY • DEMO", ta: "கொள்கை • மாதிரி" },
      title: {
        en: "What to check in a public policy announcement",
        ta: "ஒரு கொள்கை அறிவிப்பில் எதைக் கவனிக்க வேண்டும்?"
      },
      text: {
        en: "Check who is eligible, how the policy will be funded, when it is scheduled to begin, which agency is responsible, and how its outcomes will be measured. Compare the announcement with official documents before drawing conclusions.",
        ta: "யாருக்குத் தகுதி உள்ளது, திட்டத்திற்கு எவ்வாறு நிதி வழங்கப்படும், எப்போது தொடங்கும், எந்தத் துறை பொறுப்பேற்கும், அதன் முடிவுகள் எவ்வாறு அளவிடப்படும் என்பதைச் சரிபார்க்கவும். முடிவுக்கு வருவதற்கு முன் அதிகாரப்பூர்வ ஆவணங்களுடன் அறிவிப்பை ஒப்பிடவும்."
      }
    },
    {
      category: { en: "MEDIA LITERACY • DEMO", ta: "ஊடக விழிப்புணர்வு • மாதிரி" },
      title: {
        en: "Opinion, claim and verified fact: know the difference",
        ta: "கருத்து, கூற்று, சரிபார்க்கப்பட்ட உண்மை — வேறுபாடு என்ன?"
      },
      text: {
        en: "An opinion expresses a viewpoint; a claim is an assertion that may need evidence; a verified fact is supported by reliable evidence. For viral photos and videos, check the original upload, date, location and independent corroboration.",
        ta: "கருத்து என்பது ஒருவரின் பார்வை; கூற்று என்பது ஆதாரம் தேவைப்படக்கூடிய தகவல்; சரிபார்க்கப்பட்ட உண்மை என்பது நம்பகமான ஆதாரங்களால் உறுதிப்படுத்தப்படுவது. வைரலாகும் படங்கள் மற்றும் வீடியோக்களுக்கு அசல் பதிவு, தேதி, இடம் மற்றும் சுயாதீன ஆதாரங்களைச் சரிபார்க்கவும்."
      }
    }
  ];

  function applyLanguage() {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-en][data-ta]").forEach((element) => {
      element.textContent = element.dataset[language];
    });

    searchInput.placeholder =
      searchInput.dataset[`placeholder${language.toUpperCase()}`] ||
      (language === "en" ? "Search stories..." : "செய்திகளைத் தேடுங்கள்...");

    languageButton.textContent = language === "ta" ? "English" : "தமிழ்";
    filterStories();
  }

  function filterStories() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesCategory =
        activeCategory === "all" || card.dataset.category === activeCategory;

      const searchableText = [
        card.dataset.search || "",
        card.innerText || "",
        card.textContent || ""
      ].join(" ").toLocaleLowerCase();

      const matchesQuery = !query || searchableText.includes(query);
      const visible = matchesCategory && matchesQuery;

      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    noResults.hidden = visibleCount > 0;
  }

  languageButton.addEventListener("click", () => {
    language = language === "ta" ? "en" : "ta";
    applyLanguage();
  });

  searchInput.addEventListener("input", filterStories);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      filterStories();
    });
    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  document.querySelectorAll("[data-story]").forEach((button) => {
    button.addEventListener("click", () => {
      const story = stories[Number(button.dataset.story)];
      if (!story) return;

      document.getElementById("dialogCategory").textContent =
        story.category[language];
      document.getElementById("dialogTitle").textContent =
        story.title[language];
      document.getElementById("dialogText").textContent =
        story.text[language];

      dialog.showModal();
    });
  });

  document.getElementById("closeDialog").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  applyLanguage();
})();
