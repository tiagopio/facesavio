<div align="center">
  <br />
    <img src="https://raw.githubusercontent.com/tiagopio/facesavio/main/public/assets/facesavioheader.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=003366" alt="prisma" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=6C47FF" alt="clerk" />
    <img src="https://img.shields.io/badge/-Postgresql-black?style=for-the-badge&logoColor=white&logo=postgresql&color=3178C6" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h3 align="center">"Your favorite social network's favorite social network."</h3>
  <p>Fun fact: the name of the project refers to the social network Facebook, as our teacher's name was Savio, we had to make the joke!</p>

</div>

## 📋 <a name="table">Table of Contents</a>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🔋 [Features](#features)
3. 🤸 [Quick Start](#quick-start)
4. 🕸️ [Snippets](#snippets)

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Prisma
- Shadcn UI
- TailwindCSS
- PostgreSQL
- Clerk
- Webhooks
- Serverless APIs
- React Hook Form
- Zod
- TypeScript

## <a name="features">🔋 Features</a>

👉 **Authentication**: Authentication using Clerk for email, password, and social logins (Google and GitHub) with a comprehensive profile management system.

👉 **Visually Appealing Home Page**: A visually appealing home page showcasing the latest threads for an engaging user experience.

👉 **Create Post Page**: A dedicated page for users to create posts, fostering community engagement

👉 **User Search with Pagination**: A user search feature with pagination for easy exploration and discovery of other users.

👉 **Activity Page**: Display notifications on the activity page when someone comments on a user's thread, enhancing user engagement.

👉 **Profile Page**: User profile pages for showcasing information and enabling modification of profile settings.

👉 **Blazing-Fast Performance**: Optimal performance and instantaneous page switching for a seamless user experience.

👉 **Server Side Rendering**: Utilize Next.js with Server Side Rendering for enhanced performance and SEO benefits.

👉 **Prisma with Complex Schemas**: Handle complex schemas and multiple data populations using Prisma.

👉 **File Uploads with UploadThing**: File uploads using UploadThing for a seamless media sharing experience.

👉 **Real-Time Events Listening**: Real-time events listening with webhooks to keep users updated.

👉 **Middleware, API Actions, and Authorization**: Utilize middleware, API actions, and authorization for robust application security.

👉 **Next.js Layout Route Groups**: New Next.js layout route groups for efficient routing

👉 **Data Validation with Zod**: Data integrity with data validation using Zod

👉 **Form Management with React Hook Form**: Efficient management of forms with React Hook Form for a streamlined user input experience.

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/tiagopio/facesavio.git
cd facesavio
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
DATABASE_URL=
```

Create a new file named `.env.local` in the root of your project and add the following content:
```env
CLERK_SECRET_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up for the corresponding websites on [PostgreSQL](https://vercel.com/storage/postgres), [Clerk](https://clerk.com/), and [Uploadthing](https://uploadthing.com/). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>constants.index.ts</code></summary>

```typescript
import { Heart, MessageSquare, Plus, Search, UserRound } from "lucide-react";

export const sidebarLinks = [
  {
    icon: MessageSquare,
    route: "/",
    label: "Página Inicial",
  },
  {
    icon: Search,
    route: "/search",
    label: "Explorar",
  },
  {
    icon: Heart,
    route: "/activity",
    label: "Notificações",
  },
  {
    icon: Plus,
    route: "/?create-post=true",
    label: "Novo Post",
  },
  {
    icon: UserRound,
    route: "/profile",
    label: "Perfil",
  },
];
```

</details>

<details>
<summary><code>globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* main */
  .main-container {
    @apply flex min-h-screen flex-1 flex-col items-center bg-gray-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10;
  }

  /* Head Text */
  .head-text {
    @apply font-bold text-4xl text-light-1;
  }

  /* Activity */
  .activity-card {
    @apply flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4;
  }

  /* No Result */
  .no-result {
    @apply text-center text-base text-light-3;
  }

  /* Community Card */
  .community-card {
    @apply w-full rounded-lg bg-dark-3 px-4 py-5 sm:w-96;
  }

  .community-card_btn {
    @apply rounded-lg bg-primary-500 px-5 py-1.5 text-sm !text-light-1 !important;
  }

  /* thread card  */
  .thread-card_bar {
    @apply relative mt-2 w-0.5 grow rounded-full bg-neutral-800;
  }

  /* User card */
  .user-card {
    @apply flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center;
  }

  .user-card_avatar {
    @apply flex flex-1 items-start justify-start gap-3 xs:items-center;
  }

  .user-card_btn {
    @apply h-auto min-w-[74px] rounded-lg bg-primary-500 text-base text-light-1 !important;
  }

  .searchbar {
    @apply flex gap-1 rounded-lg bg-dark-3 px-4 py-2;
  }

  .searchbar_input {
    @apply border-none bg-dark-3 text-base text-light-4 outline-none !important;
  }

  .topbar {
    @apply fixed top-0 z-30 flex w-full items-center justify-between bg-main-background px-6 py-1 shadow;
  }

  .bottombar {
    @apply fixed bottom-0 z-10 w-full rounded-t-2xl bg-main-background border-t border-gray-300 p-4 backdrop-blur-lg xs:px-7 md:hidden;
  }

  .bottombar_container {
    @apply flex items-center justify-between gap-3 xs:gap-5;
  }

  .bottombar_link {
    @apply relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5;
  }

  .leftsidebar {
    @apply sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto bg-gray-1 pb-10 pt-28 max-md:hidden;
  }

  .leftsidebar_link {
    @apply relative flex justify-start gap-4 rounded-lg p-4 hover:bg-neutral-200;
  }

  .pagination {
    @apply mt-10 flex w-full items-center justify-center gap-5;
  }

  .rightsidebar {
    @apply sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto bg-gray-1 pr-10 pb-6 pt-28 max-xl:hidden;
  }
}

@layer utilities {
  .css-invert {
    @apply invert-[50%] brightness-200;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-radius: 2px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #09090a;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #5c5c7b;
    border-radius: 50px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #7878a3;
  }
}

/* Clerk Responsive fix */
.cl-organizationSwitcherTrigger .cl-userPreview .cl-userPreviewTextContainer {
  @apply max-sm:hidden;
}

.cl-organizationSwitcherTrigger
  .cl-organizationPreview
  .cl-organizationPreviewTextContainer {
  @apply max-sm:hidden;
}

/* Shadcn Component Styles */

/* Tab */
.tab {
  @apply flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important;
}

.no-focus {
  @apply focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
}

/* Account Profile  */
.account-form_image-label {
  @apply flex h-20 w-20 items-center justify-center rounded-full bg-dark-4 !important;
}

.account-form_image-input {
  @apply cursor-pointer border-none bg-transparent outline-none file:text-blue !important;
}

.account-form_input {
  @apply border border-dark-4 bg-dark-3 text-light-1 !important;
}

/* Comment Form */
.comment-form {
  @apply mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important;
}

.comment-form_btn {
  @apply rounded-3xl bg-primary-500 px-8 py-2 text-sm text-light-1 max-xs:w-full !important;
}
```

</details>

<details>
<summary><code>next.config.js</code></summary>

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
          {
            protocol: "https",
            hostname: "www.flaticon.com"
          }
        ],
      },
};

export default nextConfig;
```

</details>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // fontSize: {
    //   "heading1-bold": [
    //     "36px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "700",
    //     },
    //   ],
    //   "heading1-semibold": [
    //     "36px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "heading2-bold": [
    //     "30px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "700",
    //     },
    //   ],
    //   "heading2-semibold": [
    //     "30px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "heading3-bold": [
    //     "24px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "700",
    //     },
    //   ],
    //   "heading4-medium": [
    //     "20px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "body-bold": [
    //     "18px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "700",
    //     },
    //   ],
    //   "body-semibold": [
    //     "18px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "body-medium": [
    //     "18px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "body-normal": [
    //     "18px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "400",
    //     },
    //   ],
    //   "body1-bold": [
    //     "18px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "700",
    //     },
    //   ],
    //   "base-regular": [
    //     "16px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "400",
    //     },
    //   ],
    //   "base-medium": [
    //     "16px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "base-semibold": [
    //     "16px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "base1-semibold": [
    //     "16px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "small-regular": [
    //     "14px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "400",
    //     },
    //   ],
    //   "small-medium": [
    //     "14px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "small-semibold": [
    //     "14px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "subtle-medium": [
    //     "12px",
    //     {
    //       lineHeight: "16px",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "subtle-semibold": [
    //     "12px",
    //     {
    //       lineHeight: "16px",
    //       fontWeight: "600",
    //     },
    //   ],
    //   "tiny-medium": [
    //     "10px",
    //     {
    //       lineHeight: "140%",
    //       fontWeight: "500",
    //     },
    //   ],
    //   "x-small-semibold": [
    //     "7px",
    //     {
    //       lineHeight: "9.318px",
    //       fontWeight: "600",
    //     },
    //   ],
    // },
    extend: {
      colors: {
        "primary-500": "#877EFF",
        "secondary-500": "#FFB620",
        blue: "#0095F6",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(16, 16, 18, 0.6)",
        "main-text": "#060b11",
        "main-background": "#ffffff",
        "main-primary": "#0766FF",
        "main-secondary": "#26B5FF",
        "main-accent": "#5c8cd7",
        "dark-1": "#000000",
        "dark-2": "#121417",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "gray-1": "#F0F2F5",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

</details>

<details>
<summary><code>actions.ts</code></summary>

```typescript
"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "."
import { ActionResponse } from "@/types"
import { UserRepository } from "@/repository/user"

async function followCheck({ username }: { username: string }) {
    const clerk = await currentUser()
    if (!clerk) {
        throw new Error("Usuário não encontrado")
    }
    
    const followerRepo = new UserRepository({ username })
    const follower = await followerRepo.getUser()

    const userRepo = new UserRepository({ clerkId: clerk.id })
    const user = await userRepo.getUser()
    
    if (typeof username !== "string" || !follower || !user || user.id === follower.id) {
        throw new Error("Bad request")
    }

    return { user, follower }
}


export async function follow({ username }: { username: string }): Promise<ActionResponse> {
    try {
        const { user, follower } = await followCheck({ username })
        await db.follow.create({
            data: {
                userId: user.id,
                followingId: follower.id
            },
        })
    } catch (e) {
        console.error(e)
        return {
            error: true,
            message: "Erro ao seguir usuário"
        }
    }

    return {
        error: false,
        message: "Usuário seguido com sucesso"
    }
}

export async function unfollow({ username }: { username: string }): Promise<ActionResponse> {
    try {
        const { user, follower } = await followCheck({ username })
        await db.follow.deleteMany({
            where: {
                userId: user.id,
                followingId: follower.id
            }
        })
    } catch (e) {
        console.error(e)
        return {
            error: true,
            message: "Erro ao deixar de seguir usuário"
        }
    }

    return {
        error: false,
        message: "Usuário deixado de seguir com sucesso"
    }
}
```

</details>

<details>
<summary><code>uploadthing.ts</code></summary>

```typescript
import {generateReactHelpers} from "@uploadthing/react"

import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
```

</details>

<details>
<summary><code>user.ts</code></summary>

```typescript
import "server-only"

import { db } from "@/lib/db";
import { RequireAtLeastOne } from "@/types/util";
import { Like, Post, User } from "@prisma/client";
import { unstable_cache } from "next/cache";

type UserProps = RequireAtLeastOne<{ username: string, clerkId: string, id: string }>
type QueryUser = RequireAtLeastOne<{ set: Set<string> | Array<string>, query: string }> & { max?: number }
type Identifier = { value: string, tag: keyof UserProps }

const cache = false;
export class UserRepository {
    private identifier: Identifier = {} as Identifier;
    private userId: undefined | string;

    constructor({ username, clerkId, id }: UserProps) {
        if (id)
            this.identifier = { value: id, tag: "id" };
        else if (clerkId)
            this.identifier = { value: clerkId, tag: "clerkId" };
        else if (username)
            this.identifier = { value: username, tag: "username" };
        else
            // This should never happen
            throw new Error("Invalid identifier");
    }

    private where = () => {
        const where = {} as Record<string, string>;
        where[this.identifier.tag] = this.identifier.value;

        return where;
    }

    /**
     * Returns the database id of the user
     * @returns string
     * @throws Error if user is not found
     */
    private getId = async (): Promise<string> => {
        if (this.identifier.tag === "id")
            return this.identifier.value;

        let userId = this.userId

        // If the user id is not cached, fetch it from the database
        if (!userId) {
            const user = await db.user.findFirstOrThrow({
                where: this.where()
            })

            userId = user.id
            this.userId = userId
        }

        return userId
    }

    /**
     * Returns a user object or null if not found
     * @returns User
     */
    public getUser = async (): Promise<User | null> => {
        return await db.user.findFirst({
            where: this.where()
        });
    }

    /**
     * Returns an array of user objects
     * @returns Array<User>
     */
    public static getUsers = async ({ query, set, max = 10 }: QueryUser): Promise<Array<User>> => {
        if (query) {
            return await UserRepository.queryUsers({ query, max });
        }
        else if (set) {
            return await db.user.findMany({
                where: {
                    id: {
                        in: Array.from(set)
                    }
                }
            });
        }
        else
            throw new Error("Invalid query");
    }

    /**
     * Returns a user object
     * @returns User
     * @throws Error if user is not found
     */
    public getUserOrThrow = async (): Promise<User> => {
        return await db.user.findFirstOrThrow({
            where: this.where()
        });
    }

    /**
     * Returns a set of id's of users that the user is following
     * @returns Set<string>
    */
    public getFollowing = async (): Promise<Set<string>> => {
        const userId = await this.getId();
        const followers = await db.follow.findMany({
            where: { userId }
        });

        const followerSet = new Set<string>();
        followers.forEach(f => {
            followerSet.add(f.followingId);
        });

        return followerSet;
    }
    /**
     * Returns a set of id's of users that are following the user
     * @returns Set<string>
    */
    public getFollowedBy = async (): Promise<Set<string>> => {
        const userId = await this.getId();
        const following = await db.follow.findMany({
            where: { followingId: userId }
        });

        const followingSet = new Set<string>();
        following.forEach(f => {
            followingSet.add(f.userId);
        });

        return followingSet;
    }

    /**
     * Returns an array of posts that the user has made
     * @returns Array<Post>
     * @throws Error if user is not found
    */
    public getUserPosts = async (): Promise<Array<Post & { likes: Array<Like> }>> => {
        const userId = await this.getId();
        return await db.post.findMany({
            where: { userId },
            include: { likes: true },
            orderBy: { createdAt: "desc" }
        });
    }

    /**
     * Query users based on a search query
     * This function is cached for 60 seconds.
     * @returns Array<User>
     */
    private static queryUsers = ({ max = 10, query }: { max?: number, query: string }) => unstable_cache(
        async ({
            max = 10,
            query
        }: {
            max: number,
            query: string
        }): Promise<Array<User>> => {
            return await db.user.findMany({
                take: max,
                where: {
                    OR: [
                        { username: { contains: query, mode: "insensitive" } },
                        { name: { contains: query, mode: "insensitive" } }
                    ]
                }
            });
        },
        [`query-users-${query}`],
        { revalidate: cache && 60 } // 60 seconds
    )({ max, query });

    /**
     * Returns an array of suggested posts
     * @returns Array<Post>
    */
    public getSuggestedPosts = async (): Promise<Array<Post & { user: User, likes: Array<Like> }>> => {
        return await db.post.findMany({
            include: {
                user: true,
                likes: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    /**
     * Returns an array of suggested users to follow
     * @returns Array<User>
     * @throws Error if user is not found
    */
    private getSuggestedUsersAlgorithm = async ({
        max = 10
    }): Promise<Array<User>> => {
        console.log("Fetching suggested users")
        const following = await this.getFollowing(); // Users that the user is following
        const followedBy = await this.getFollowedBy(); // Users that are following the user
        const userId = await this.getId();

        console.log("Following", following, userId)
        console.log("FollowedBy", followedBy, userId)

        const isFollowing = (id: string) => following.has(id);

        // Followers that the user is not following
        const unfollowed = new Set<string>();
        followedBy.forEach(f => {
            if (!isFollowing(f))
                unfollowed.add(f);
        })

        console.log("Unfollowed", unfollowed, userId)

        // Friends of friends
        const friendsOfFriendsQuery = await db.follow.findMany({
            where: {
                userId: { in: Array.from(following) }
            }
        });

        // Map of relevance for each user (calculates how many friends in common for each user)
        const relevanceMap = new Map<string, number>();
        friendsOfFriendsQuery.forEach(f => {
            if (f.followingId !== userId) {
                const relevance = relevanceMap.get(f.followingId) || 0;
                relevanceMap.set(f.followingId, relevance + 1);
            }
        });

        console.log("Relevance map", relevanceMap, userId)

        const friendsOfFriends = new Set<string>();
        const sorted = Array.from(relevanceMap.entries()).sort((a, b) => b[1] - a[1]);
        sorted.forEach(f => {
            friendsOfFriends.add(f[0]);
        });

        console.log("Friends of friends", friendsOfFriends, userId)

        const target = await db.user.findMany({
            take: max,
            where: {
                // Users that my friends are following
                id: {
                    in: Array.from(friendsOfFriends)
                }
            }
        });

        if (target.length < max) {
            const remaining = max - target.length;
            const more = await db.user.findMany({
                take: remaining,
                where: {
                    id: {
                        in: Array.from(unfollowed)
                    }
                }
            });

            console.log("More", more, userId)

            target.push(...more);
        }


        return target;
    }

    /**
     * Returns an array of suggested users to follow.
     * This function is cached for 24 hours.
     * @returns Array<User>
     * @throws Error if user is not found
    */
    public getSuggestedUsers = unstable_cache(
        this.getSuggestedUsersAlgorithm,
        [`suggested-users-algorithm-${this.identifier.value}`],
        { revalidate: cache && 60 } // 60 seconds
    );

    /**
     * Returns an array of likes that the user received on their posts in descending order
     * @returns Array<Like>
     * @throws Error if user is not
     */
    public getLikes = async ({ max = 10 }): Promise<Array<Like & { user: User, post: Post }>> => {
        const userPosts = await this.getUserPosts();

        const postIds = userPosts.map(p => p.id);
        return await db.like.findMany({
            take: max,
            where: {
                postId: {
                    in: postIds
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true,
                post: true
            }
        });
    }

}
```

</details>

<details>
<summary><code>utils.ts</code></summary>

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

export function initials(name: string | undefined | null) {
  const defaultInitials = "FS";
  if (!name) return defaultInitials;

  const [firstName, lastName] = name?.split(" ");
  if (!firstName) return defaultInitials;
  
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
}
```

</details>

<div align="center">
  <a align="center" href="https://github.com/tiagopio/facesavio/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tiagopio/facesavio" />
  </a>
</div>
