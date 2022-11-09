import { createClient, createCurrentUserHook, createImageUrlBuilder } from 'next-sanity';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    apiVersion: "2021-03-25",
    useCDN: process.env.NODE_ENV === "production"
}

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);