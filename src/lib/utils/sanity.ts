import type { PortableTextBlock } from '@portabletext/types';
import { createClient } from '@sanity/client';
import type {
	ImageAsset,
	FieldReference,
	Slug,
	UrlDefinition,
	TypeReference,
	FieldGroup,
	ObjectField,
	Image
} from '@sanity/types';
import groq from 'groq';

import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2023-03-20' // date of setup
});

export async function getPosts(): Promise<Post[]> {
	return await client.fetch(
		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
      _createdAt,
      title,
      slug,
      mainImage,
      body,
      categories[]->{
        _type,
        "slug": slug.current,
        title
      },
      author->{
        _type,
        "slug": slug.current,
        name,
        bio,
        image
      },
      excerpt  
    }`
	);
}

export async function getPostsbyCategory(category: string): Promise<Post[]> {
	return await client.fetch(
		groq`*[_type == "post" && $category in categories[]->slug.current | order(_createdAt desc)] {
			_createdAt,  
	title,
      slug,
      mainImage,
      categories[] -> {
        title,
        slug
},
}`,
		{
			category
		}
	);
}

export async function getPost(slug: string): Promise<Post> {
	return await client.fetch(
		groq`*[_type == "post" && slug.current == $slug][0]{
      _createdAt,
      title,
      slug,
      mainImage,
      body,
      categories[]->{
        _type,
        "slug": slug.current,
        title
      },
      author->{
        _type,
        "slug": slug.current,
        name,
        bio,
        image
      },
      excerpt  
    }`,
		{
			slug
		}
	);
}

export async function getPage(page: string): Promise<Page> {
	return await client.fetch(groq`*[_type == "page" && slug.current == $page][0]`, {
		page
	});
}
export async function getSiteSettings(): Promise<SiteSetting> {
	return await client.fetch(groq` *[_type == "settings"][0]{
	title,
	sosyalmedya,
	 menuItems[]->{
	   _type,
	   "slug": slug.current,
	   title
	 },
	 ogImage,
   }`);
}

export async function getSlider(): Promise<Manset[]> {
	return await client.fetch(
		groq`*[_type == "manset"] | order(_createdAt desc){
      _createdAt,
      title,
      resim,
      overview,
    }`
	);
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	author?: {
		name: string;
		image: ImageAsset;
		bio: PortableTextBlock[];
	};
	slug: Slug;
	excerpt?: string;
	mainImage: ImageAsset;
	body: PortableTextBlock[];
	categories: Array<Category>;
}

export interface Category {
	slug: string;
	title: string;
}

export type Slides = Manset[];

export interface Manset {
	_type: 'manset';
	_createdAt: string;
	title?: string;
	slug: Slug;
	overview?: string;
	resim: ImageAsset;
}

export interface Page {
	_type: 'page';
	_createdAt: string;
	title?: string;
	slug: Slug;
	overview?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export interface SiteSetting {
	_type: 'settings';
	title?: string;
	menuItems: menuItem[];
	footer?: PortableTextBlock[];
	ogImage?: ImageAsset;
	sosyalmedya: SosyalMedya;
}
export interface menuItem {
	_type: string;
	slug: string;
	title: string;
}
export interface SosyalMedya {
	twitter: string;
	facebook: string;
	instagram: string;
}
