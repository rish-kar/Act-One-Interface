export type GalleryImage = {
  id: string
  src: string
  alt: string
  onlyGallery?: boolean
}

export type PlayGallerySection = {
  id: string
  title: string
  synopsis?: string
  images: GalleryImage[]
}

// Images intended for the public gallery. (Includes `onlyGallery/` images.)
export const galleryImages: GalleryImage[] = [
  {
    id: '472282411_895240999346211_1072480196469497077_n',
    src: new URL('./images/gallery/onlyGallery/472282411_895240999346211_1072480196469497077_n.webp', import.meta.url).href,
    alt: 'Gallery image',
    onlyGallery: true,
  },
  {
    id: '472284277_895240976012880_5041434027962513917_n',
    src: new URL('./images/gallery/onlyGallery/472284277_895240976012880_5041434027962513917_n.webp', import.meta.url).href,
    alt: 'Gallery image',
    onlyGallery: true,
  },
]

// Images allowed in background (excludes `onlyGallery/`).
export const backgroundGalleryImages: GalleryImage[] = galleryImages.filter((img) => !img.onlyGallery)

// Gallery grouped by previous play folders.
// Filenames follow: playSlug-<number>.<ext> (e.g., uttara-01.jpg).
export const playGallerySections: PlayGallerySection[] = [
  {
    id: 'breath',
    title: 'Breath',
    synopsis: 'Delhi\'s air pollution is a severe, recurring environmental and public health crisis that worsens dramatically each winter. The issue is complex, stemming from a combination of meteorological conditions, local emission sources, and regional agricultural practices. The following sections break down the causes, the stark impact on human health, and the measures being taken to combat it.',
    images: Array.from({ length: 26 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `breath-${n}`,
        src: new URL(`./images/gallery/previousPlays/Breath/breath-${n}.webp`, import.meta.url).href,
        alt: 'Breath',
      }
    }),
  },
  {
    id: 'chorabali',
    title: 'Chorabali',
    synopsis: 'The Headmaster faces the chalkboard, a cornerstone of the community, a designer of destinies. For many years, his persona has been depicted on the classroom blackboard: Mr. Satya Bhushan Dutta the teacher, the enforcer, the ethical guide for countless generations of students. His power is founded on trust, his regard gained through knowledge and justice. Next, the unimaginable occurs in his life. In an instant, the core supports of his existence crumble into a heap of personal suffering and societal critique. This narrative illustrates a teacher’s distinctly powerless situation, trapped between an unwavering parental love and the relentless demands of his societal responsibilities.',
    images: Array.from({ length: 19 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `chorabali-${n}`,
        src: new URL(`./images/gallery/previousPlays/Chorabali/chorabali-${n}.webp`, import.meta.url).href,
        alt: 'Chorabali',
      }
    }),
  },
  {
    id: 'gobhir-asukh',
    title: 'Gobhir Asukh',
    synopsis: 'Elderly members of the family often suffer alone. In their minds, they often feel regret "Those for whom I gave my best time, when I was engaged with the wider world — they don\'t have time for me now, no time to talk with me."\n' +
        'At that time, they withdraw deep within themselves — they spend their days with the thought that they will find peace only when they are released from life. However, one cannot simply get release from life just by wishing it. This is a problem for an elderly person. At present, this period has become evident as families are primarily nuclear. Consequently, elderly parents endure loneliness due to household duties, being deeply involved in career matters, and being preoccupied with personal issues. Furthermore, when an individual loses their life partner in their later years, this loneliness intensifies significantly. However, wherever there is an issue, there also lies a resolution — Rather than faulting the children of the senior family member and viewing the matter negatively, we should adopt a new perspective. Above all, we must keep in mind: while there is breath, there is existence. Growing older does not signify that the joys, pleasures, preferences, aversions, and experiences of life have come to an end — that is incorrect. As long as we exist, embrace life completely. For this reason, we have to remember several points: Primarily, we must prioritize our own physical and mental health. The play Gobhir Asukh signifies mental illness is, as we understand, a much more profound condition than physical illness. \n' +
        '\n',
    images: Array.from({ length: 15 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `gobhir-asukh-${n}`,
        src: new URL(`./images/gallery/previousPlays/GobhirAsukh/gobhir-asukh-${n}.webp`, import.meta.url).href,
        alt: 'Gobhir Asukh',
      }
    }),
  },
  {
    id: 'chenni',
    title: 'Chenni',
    synopsis:
      "Play ‘Chenni’ tells the story of a Kannad girl named Chenni, born into a Dalit family in a remote village in Karnataka. Her father, Kariappa, and her mother, Sabri, are deeply religious people who believe in God and blindly follow social customs and religious practices. When Chenni falls seriously ill at a very young age, her parents, instead of seeking medical treatment, take her to a temple priest. The priest compels them to dedicate little Chenni to God, making her a Basvi. The Basvi tradition is a social system in which girls are symbolically married to God and, after attaining the age of eighteen, are made available to physically satisfy Brahmin guests.  Chenni becomes a victim of these rigid customs and oppressive social systems. Exploited by thousand-year-old rituals and beliefs, she ultimately commits suicide in defiance of the abhorrent feudal system. Her death serves as a powerful foreshadowing of the collapse of that system, perhaps marking the final nail in its coffin.",
    images: Array.from({ length: 8 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `chenni-${n}`,
        src: new URL(`./images/gallery/previousPlays/Chenni/chenni-${n}.webp`, import.meta.url).href,
        alt: 'Chenni',
      }
    }),
  },
  {
    id: 'chup-adalat-cholche',
    title: 'Chup Adalat Cholche',
    synopsis:
      'Vijay Tendulkar’s Shantata! Court Chalu Aahe (Silence! The Court Is in Session), written in 1963 and first performed in 1967, stands as a landmark work in Indian theatre. Through its unsettling courtroom-within-a-play structure, it delivers a sharp and unflinching critique of a deeply patriarchal society. At its core is the tragic ordeal of Benare, a woman subjected to moral scrutiny and public humiliation by those she considers her peers. The play powerfully exposes how societal discrimination often disguises itself as harmless play or collective ritual, sanctioned and normalized by the group. Benare’s personal tragedy is not an isolated incident but a reflection of a much larger reality—the enduring struggle of Indian women for dignity, autonomy, and the right to define their own lives in the face of social hypocrisy and judgment.',
    images: Array.from({ length: 7 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `chup-adalat-cholche-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/ChupAdalatCholche/chup-adalat-cholche-${n}.webp`,
          import.meta.url,
        ).href,
        alt: 'Chup Adalat Cholche',
      }
    }),
  },
  {
    id: 'daag',
    title: 'Daag',
    synopsis:
      'The play is rooted in a teacher’s struggle against politically motivated industrialization in rural India—an ongoing and deeply contentious issue. It highlights how local communities are often forced to confront state-backed corporate projects that prioritize profit and political interests over people. These developments threaten not only the environment but also the livelihoods, culture, and social fabric of rural populations, turning the teacher’s fight into a powerful symbol of grassroots resistance and moral courage.',
    images: Array.from({ length: 10 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `daag-${n}`,
        src: new URL(`./images/gallery/previousPlays/Daag/daag-${n}.webp`, import.meta.url).href,
        alt: 'Daag',
      }
    }),
  },
  {
    id: 'persuitof-pleasure',
    title: 'Persuit of Pleasure',
    synopsis:
      '“Pursuit of Pleasure” is a non-verbal short play about four elderly men living in an old-age home called The Nest. In their daily lives, these old men play music, play cards, and often quarrel with one another, yet life still feels tedious and colourless. One fine day, a lady caretaker arrives to look after them, and suddenly the meaning of life begins to change for these men. Each of them starts to pursue personal pleasures and imagines himself as the partner of the lady caretaker. Their obsession with her gradually disrupts their routine and daily activities.\n\nOne morning, the lady goes out, meets with an accident, and dies. The four men are heartbroken, and once again life seems meaningless. Soon after, another woman appears as a caretaker, and everything changes for these old men—life regains its colour and vitality. As a noble man once said, “Winter always turns into spring.”',
    images: Array.from({ length: 5 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `persuitof-pleasure-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/PersuitofPleasure/persuitof-pleasure-${n}.webp`,
          import.meta.url,
        ).href,
        alt: 'Persuit of Pleasure',
      }
    }),
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    synopsis:
      'The play “Restora” (Restaurant) is written by Zulfikar Jinnah. Through this socially conscious play, the playwright tells a story that leaves us deeply moved. In the restaurant, live news gathering continues alongside evening entertainment. Alongside the serving of delicious food, stark social disparities are exposed. Just when the so-called elite are busy taking selfies and discussing human rights, the climax of the play is revealed, leaving us astonished. The game being played behind the well-decorated lights and shadows of the restaurant is uncovered. A restaurant emerging from the depths of darkness confronts us with an eternal question. In this way, the play teaches us to recognize real human rights. “Restaurant” strips away the façade of the expensive, artificial elite and reveals the truth. Just as the hollowness beneath pomp and grandeur was exposed in Rabindranath Tagore’s “Kaler Jatra” (Journey of Time), in the same way, the playwright places the driving force in the hands of the working-class people. The real bearer of rights is the one whose human rights are snatched away.',
    images: Array.from({ length: 7 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `restaurant-${n}`,
        src: new URL(`./images/gallery/previousPlays/Restaurant/restaurant-${n}.webp`, import.meta.url).href,
        alt: 'Restaurant',
      }
    }),
  },
  {
    id: 'sadhonbabur-sondhyeo',
    title: 'Sadhonbabur Sondhyeo',
    synopsis:
      'Sadhonbabu is a bachelor who is extremely fond of auctions and regularly visits auction houses. He is a self-centred individual, but his greatest weakness is his constant doubt and suspicion. One evening, after returning from his office, he discovers a tree branch lying inside his room. Curious and disturbed by this strange sight, he questions his servant, Pocha. Pocha claims he did not notice any such branch, so Sadhonbabu calls his neighbour Mukundo to discuss the matter. Mukundo, who often mocks and teases Sadhonbabu, plants fear in his mind by suggesting that the branch could be a bomb and that someone might be trying to kill him. Already a fearful man plagued by doubts, Sadhonbabu becomes terrified and reveals to Mukundo that years ago he had quarrelled with an anti-social man named Madhu during a card game, after which Madhu had threatened to kill him. Thus, the simple tree branch deepens Sadhonbabu’s fear and suspicion.\n\nA few days later, upon returning from work, Sadhonbabu finds a box wrapped in brown paper lying on his table. He enquires about it from Pocha, who tells him that Dhona, the servant of another neighbour, delivered it. Sadhonbabu immediately calls Dhona to clear his doubts and learns that a man named Bomba, dressed in a black suit, instructed Dhona to deliver the box carefully to Sadhonbabu. This information terrifies him further, and he becomes convinced that the box contains a bomb. He asks Pocha to inspect the box, but Pocha refuses. The next morning, Pocha notices that the box is no longer on the table, and Sadhonbabu tells him that Madhu came during the night and took it away.\n\nSoon after, auctioneer Kumud visits Sadhonbabu to enquire about the box and informs him that he had sent an antique Italian clock wrapped in brown paper. Sadhonbabu is left speechless, having already drowned the suspicious box in the river Ganga in the middle of the night.',
    images: [
      {
        id: 'sadhonbabur-sondhyeo-01',
        src: new URL(
          './images/gallery/previousPlays/SadhonbaburSondhyeo/sadhonbabur-sondhyeo-01.webp',
          import.meta.url,
        ).href,
        alt: 'Sadhonbabur Sondhyeo',
      },
      ...Array.from({ length: 4 }, (_, i) => {
        const n = String(i + 2).padStart(2, '0')
        return {
          id: `sadhonbabur-sondhyeo-${n}`,
          src: new URL(
            `./images/gallery/previousPlays/SadhonbaburSondhyeo/sadhonbabur-sondhyeo-${n}.webp`,
            import.meta.url,
          ).href,
          alt: 'Sadhonbabur Sondhyeo',
        }
      }),
    ],
  },
  {
    id: 'shades-of-women',
    title: 'Shades of Women',
    synopsis:
      'The situation of women in India is marked by a striking contradiction: while a robust legal framework promises equality and protection, deeply entrenched social norms continue to perpetuate discrimination and injustice. Yet history—both past and present—bears witness to the resilience, courage, and resistance of women who have refused to remain silent. Individually and collectively, women have continuously challenged oppression, reclaiming their voices and agency in powerful ways. Shades of Women, a non-verbal short play, brings these realities to the stage by portraying the journeys of three brave women, each reflecting a different shade of struggle, strength, and defiance against societal constraints.',
    images: Array.from({ length: 6 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `shades-of-women-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/ShadesOfWomen/shades-of-women-${n}.webp`,
          import.meta.url,
        ).href,
        alt: 'Shades of Women',
      }
    }),
  },
  {
    id: 'the-father',
    title: 'The Father',
    synopsis:
      'The Father is a play first written in 1887 by the famed and prolific Swedish playwright August Strindberg. It presents a tense battle of wills between a husband and wife as they argue over their daughter’s future.  The adapted Bengali play “The Father” is set in a family home in Panaji, in pre-independent Goa, in the year 1950. Daniel Maurice D’Costa, a Captain in the Goan Army and an astrophysicist, is trapped in a bitter marriage with a woman named Silvia. When the Captain and his wife disagree about the future education of their daughter, Elina, the couple grow even more distant. The Captain wants Elina to go to Bombay to study and become a teacher, while Silvia wants her to stay in Panaji and become an artist. The Captain lashes out against the female forces in his life, telling Silvia that she gave up her rights when she married and became financially dependent on her husband.  However, Silvia plants a devastating suspicion in her husband’s mind by suggesting that Elina is not his daughter after all. She then sets out to convince the new physician in town that the Captain is going mad. When the Captain learns of her plan, he loses his temper and reacts by throwing a lamp at her. This violent act makes him realise he has lost control, and he begins to rapidly descend into mental decline. Meanwhile, Silvia’s brother, Professor Peter Gomes, recognises—and half admires—the cunning game his sister has played to rid herself of her domineering husband and regain her rights. Ultimately, forced into a straitjacket, the Captain admits defeat to his wife’s dominance—“You could hypnotize me when I was wide awake, so that I neither saw nor heard, only obeyed”—and suffers a fatal stroke and dies. The play also mentions the Prophet Ezekiel’s words: “Only a fool can say that he is my father.” It becomes clear that even a tiny drop of doubt can create a vast ocean of doubts.',
    images: [
      ...Array.from({ length: 5 }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return {
          id: `the-father-${n}`,
          src: new URL(`./images/gallery/previousPlays/TheFather/the-father-${n}.webp`, import.meta.url).href,
          alt: 'The Father',
        }
      }),
      ...Array.from({ length: 3 }, (_, i) => {
        const n = String(i + 6).padStart(2, '0')
        return {
          id: `the-father-${n}`,
          src: new URL(`./images/gallery/previousPlays/TheFather/the-father-${n}.webp`, import.meta.url).href,
          alt: 'The Father',
        }
      }),
    ],
  },
  {
    id: 'the-story-teller',
    title: 'The Storyteller',
    synopsis:
      '“Childhood should be carefree, playing in the sun; not living a nightmare in the darkness of the soul.” — Dave Pelzer.  The play ‘The Storyteller’ follows the life of Anthony Peck, a writer based in Darjeeling who writes stories for children—and, more importantly, tells stories to those children whose childhood has become a nightmare. One day, the Darjeeling police arrest Anthony and his younger brother, Michael, on charges of murdering three people: two children and one man. Another girl is still missing. The accusations seem bizarre, because the murders reportedly occurred in the same manner Anthony has described the killings of children in several of his stories.  During interrogation, Additional Superintendent of Darjeeling Police Anita Bansal employs every possible method to make Anthony confess. As the questioning unfolds, Anthony begins narrating a few of the stories Anita refers to—stories that expose child abuse and the darkness of broken childhoods. That night, inside the cell, Anthony kills his younger brother Michael and confesses that he has committed four murders. Yet during his confession, he insists that he never killed any children—he claims he protected them. He reveals that two of the children were killed by their relatives, and that the third child is still alive, saved by him from being killed by her foster parents. Through this, Anthony points to the brutal consequences of a stubborn society—one that repeatedly fails to help helpless children who are tortured and abused. Acting on Anthony’s description, the police locate the third child and also find three corpses behind his house.  Anthony further reveals that he and his brother were themselves viciously tortured and abused by their foster parents. He admits to killing his foster parents, and also confesses to killing the uncle of the second child, who had murdered the child near the toy train track. Anthony’s violence extends even to Michael—his own brother—because Michael had taken money to kill the third child. In the end, unexpectedly, Anthony is shot by the police. However, his stories remain alive among thousands of poor children, inspiring them to live with dignity. Anthony’s stories, he believes, will inspire someone in the future to become a protector of vulnerable children and continue the legacy.',
    images: Array.from({ length: 4 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `the-story-teller-${n}`,
        src: new URL(
          `./images/gallery/previousPlays/TheStoryTeller/the-story-teller-${n}.webp`,
          import.meta.url,
        ).href,
        alt: 'The Storyteller',
      }
    }),
  },
  {
    id: 'uttara',
    title: 'Uttara',
    synopsis:
      'Drona Parva is regarded as one of the most significant parvas of the Mahabharata, as several crucial incidents occur within it. Among them, the demise of Abhimanyu stands out as one of the most important. His death is particularly significant in the context of the Mahabharata war because he was the first member of the Pandava family to be killed by the Kauravas.  In this play, Dr. Sisir Kumar Das presents the emotions and deep self-introspection of Uttara (the wife of Abhimanyu), Subhadra (the mother of Abhimanyu), and Draupadi following Abhimanyu’s death on the thirteenth day of the war. After his death, haunting questions arise: Why did this war happen? Why are we the ones suffering? Draupadi responds by explaining that the war was fought against Adharma, which had to be eradicated from the earth. She further reflects that the war was driven by her own desire for revenge, by a clash of egos between brothers, and that such a war inevitably demands sacrifices.',
    images: Array.from({ length: 10 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `uttara-${n}`,
        src: new URL(`./images/gallery/previousPlays/Uttara/uttara-${n}.webp`, import.meta.url).href,
        alt: 'Uttara',
      }
    }),
  },
]
