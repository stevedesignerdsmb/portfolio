'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CldImage } from '@/lib/cloudinary';
import { getAllProjects } from '@/lib/projects';
import { Visual } from '@/types';
import visualsData from '@/data/visuals.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FolderCard } from './FolderCard';

type TabType = 'visuals' | 'projects' | 'motion';

const TABS = [
  {
    name: 'visuals' as TabType,
    label: 'Visuals',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_197993_36733)">
          <mask id="mask0_197993_36733" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
            <path d="M18 0H0V18H18V0Z" fill="white"/>
            <path d="M8.99997 3.75C13.2064 3.75004 15.9697 6.86716 17.0163 8.29763C17.3278 8.72333 17.3278 9.27667 17.0163 9.70237C15.9697 11.1328 13.2064 14.2499 8.99997 14.25C4.79355 14.25 2.03021 11.1328 0.983612 9.70237C0.672129 9.27667 0.672129 8.72333 0.983612 8.29763C2.03021 6.86714 4.79355 3.75001 8.99997 3.75ZM8.99997 6C7.34312 6 5.99997 7.34314 5.99997 9C5.99997 10.6568 7.34312 12 8.99997 12C10.6568 12 12 10.6568 12 9C12 7.34317 10.6568 6.00003 8.99997 6Z" fill="black"/>
          </mask>
          <g mask="url(#mask0_197993_36733)">
            <path d="M8.99812 1.5C9.4122 1.50017 9.74812 1.8359 9.74812 2.25V4.94385C10.5148 5.08474 11.2077 5.43662 11.7631 5.93848C11.7751 5.92157 11.7881 5.90481 11.8018 5.88867L13.9508 3.36328C14.2192 3.04796 14.693 3.00994 15.0084 3.27832C15.3235 3.54673 15.3616 4.01983 15.0934 4.3352L12.9445 6.86133C12.861 6.95933 12.757 7.02947 12.6448 7.073C12.9495 7.64828 13.1231 8.3037 13.1231 9C13.1231 11.2781 11.2762 13.1249 8.99812 13.125C6.71998 13.125 4.87315 11.2782 4.87315 9C4.87315 8.30393 5.04552 7.64813 5.34996 7.073C5.23809 7.02938 5.13513 6.95848 5.05187 6.86059L2.90514 4.3352L3.47643 3.84961L4.04772 3.36328L6.19444 5.88941L6.23253 5.93921C6.78802 5.437 7.48106 5.08475 8.24812 4.94385V2.25C8.24812 1.83584 8.58397 1.50007 8.99812 1.5ZM2.99083 3.27759C3.30633 3.00981 3.77953 3.04809 4.04772 3.36328L2.90514 4.3352C2.63686 4.01961 2.67523 3.54587 2.99083 3.27759Z" fill="url(#paint0_linear_197993_36733)"/>
          </g>
          <mask id="mask1_197993_36733" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="3" width="18" height="12">
            <path d="M8.99997 3.75C13.2064 3.75004 15.9697 6.86716 17.0163 8.29763C17.3278 8.72333 17.3278 9.27667 17.0163 9.70237C15.9697 11.1328 13.2064 14.2499 8.99997 14.25C4.79355 14.25 2.03021 11.1328 0.983612 9.70237C0.672129 9.27667 0.672129 8.72333 0.983612 8.29763C2.03021 6.86714 4.79355 3.75001 8.99997 3.75ZM8.99997 6C7.34312 6 5.99997 7.34314 5.99997 9C5.99997 10.6568 7.34312 12 8.99997 12C10.6568 12 12 10.6568 12 9C12 7.34317 10.6568 6.00003 8.99997 6Z" fill="white"/>
          </mask>
          <g mask="url(#mask1_197993_36733)">
            <g filter="url(#filter0_f_197993_36733)">
              <path d="M8.99812 1.5C9.4122 1.50017 9.74812 1.8359 9.74812 2.25V4.94385C10.5148 5.08474 11.2077 5.43662 11.7631 5.93848C11.7751 5.92157 11.7881 5.90481 11.8018 5.88867L13.9508 3.36328C14.2192 3.04796 14.693 3.00994 15.0084 3.27832C15.3235 3.54673 15.3616 4.01983 15.0934 4.3352L12.9445 6.86133C12.861 6.95933 12.757 7.02947 12.6448 7.073C12.9495 7.64828 13.1231 8.3037 13.1231 9C13.1231 11.2781 11.2762 13.1249 8.99812 13.125C6.71998 13.125 4.87315 11.2782 4.87315 9C4.87315 8.30393 5.04552 7.64813 5.34996 7.073C5.23809 7.02938 5.13513 6.95848 5.05187 6.86059L2.90514 4.3352L3.47643 3.84961L4.04772 3.36328L6.19444 5.88941L6.23253 5.93921C6.78802 5.437 7.48106 5.08475 8.24812 4.94385V2.25C8.24812 1.83584 8.58397 1.50007 8.99812 1.5ZM2.99083 3.27759C3.30633 3.00981 3.77953 3.04809 4.04772 3.36328L2.90514 4.3352C2.63686 4.01961 2.67523 3.54587 2.99083 3.27759Z" fill="url(#paint1_linear_197993_36733)"/>
            </g>
          </g>
          <path d="M8.99997 3.75C13.2064 3.75004 15.9697 6.86716 17.0163 8.29763C17.3278 8.72333 17.3278 9.27667 17.0163 9.70237C15.9697 11.1328 13.2064 14.2499 8.99997 14.25C4.79355 14.25 2.03021 11.1328 0.983612 9.70237C0.672129 9.27667 0.672129 8.72333 0.983612 8.29763C2.03021 6.86714 4.79355 3.75001 8.99997 3.75ZM8.99997 6C7.34312 6 5.99997 7.34314 5.99997 9C5.99997 10.6568 7.34312 12 8.99997 12C10.6568 12 12 10.6568 12 9C12 7.34317 10.6568 6.00003 8.99997 6Z" fill="url(#paint2_linear_197993_36733)"/>
          <path d="M9 3.75C13.2064 3.75005 15.9697 6.86716 17.0163 8.29763C17.3278 8.72333 17.3278 9.27667 17.0163 9.70237C15.9697 11.1328 13.2064 14.2499 9 14.25C4.79356 14.25 2.03021 11.1328 0.983617 9.70237C0.672128 9.27667 0.672128 8.72333 0.983617 8.29763C2.03021 6.86714 4.79356 3.75001 9 3.75ZM9 4.3125C5.07944 4.31251 2.4628 7.22843 1.43771 8.62943C1.27093 8.85735 1.27093 9.14265 1.43771 9.37057C2.4628 10.7716 5.07944 13.6875 9 13.6875C12.9205 13.6874 15.5372 10.7715 16.5622 9.37057C16.729 9.14265 16.729 8.85735 16.5622 8.62943C15.5372 7.22846 12.9205 4.31255 9 4.3125Z" fill="url(#paint3_linear_197993_36733)"/>
        </g>
        <defs>
          <filter id="filter0_f_197993_36733" x="-0.273438" y="-1.5" width="18.5469" height="17.625" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_197993_36733"/>
          </filter>
          <linearGradient id="paint0_linear_197993_36733" x1="8.99947" y1="1.5" x2="8.99947" y2="13.125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#575757"/>
            <stop offset="1" stopColor="#151515"/>
          </linearGradient>
          <linearGradient id="paint1_linear_197993_36733" x1="8.99947" y1="1.5" x2="8.99947" y2="13.125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#575757"/>
            <stop offset="1" stopColor="#151515"/>
          </linearGradient>
          <linearGradient id="paint2_linear_197993_36733" x1="8.99997" y1="3.75" x2="8.99997" y2="14.25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E3E3E5" stopOpacity="0.6"/>
            <stop offset="1" stopColor="#BBBBC0" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="paint3_linear_197993_36733" x1="9" y1="3.75" x2="9" y2="9.83025" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <clipPath id="clip0_197993_36733">
            <rect width="18" height="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: 'projects' as TabType,
    label: 'Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M16.2 5C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V11.2C21 12.8802 21 13.7202 20.673 14.362C20.3854 14.9265 19.9265 15.3854 19.362 15.673C18.7202 16 17.8802 16 16.2 16H7.8C6.11984 16 5.27976 16 4.63803 15.673C4.07354 15.3854 3.6146 14.9265 3.32698 14.362C3 13.7202 3 12.8802 3 11.2L3 6.8C3 5.11984 3 4.27976 3.32698 3.63803C3.6146 3.07354 4.07354 2.6146 4.63803 2.32698C5.27976 2 6.11984 2 7.8 2L9.28741 2C9.91355 2 10.2266 2 10.5108 2.0863C10.7624 2.1627 10.9964 2.28796 11.1996 2.45491C11.429 2.64349 11.6027 2.90398 11.95 3.42496L13 5H16.2Z" fill="url(#1752500502786-6297956_folder_existing_0_ekojck6b3)" data-glass="origin" mask="url(#1752500502786-6297956_folder_mask_2iow0yqdp)"></path>
          <path d="M16.2 5C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V11.2C21 12.8802 21 13.7202 20.673 14.362C20.3854 14.9265 19.9265 15.3854 19.362 15.673C18.7202 16 17.8802 16 16.2 16H7.8C6.11984 16 5.27976 16 4.63803 15.673C4.07354 15.3854 3.6146 14.9265 3.32698 14.362C3 13.7202 3 12.8802 3 11.2L3 6.8C3 5.11984 3 4.27976 3.32698 3.63803C3.6146 3.07354 4.07354 2.6146 4.63803 2.32698C5.27976 2 6.11984 2 7.8 2L9.28741 2C9.91355 2 10.2266 2 10.5108 2.0863C10.7624 2.1627 10.9964 2.28796 11.1996 2.45491C11.429 2.64349 11.6027 2.90398 11.95 3.42496L13 5H16.2Z" fill="url(#1752500502786-6297956_folder_existing_0_ekojck6b3)" data-glass="clone" filter="url(#1752500502786-6297956_folder_filter_56qas2ark)" clipPath="url(#1752500502786-6297956_folder_clipPath_gygn8e14a)"></path>
          <path d="M17.4051 9C19.3327 9 20.2965 9 20.9861 9.39213C21.5914 9.73631 22.0581 10.2803 22.3062 10.9309C22.5889 11.6721 22.4424 12.6247 22.1492 14.5299L21.6262 17.9299C21.4039 19.3744 21.2928 20.0966 20.9388 20.6393C20.6267 21.1176 20.1846 21.4969 19.6644 21.7326C19.0742 22 18.3435 22 16.882 22L7.11801 22C5.65653 22 4.92579 22 4.33558 21.7326C3.8154 21.4969 3.3733 21.1176 3.06124 20.6393C2.70717 20.0966 2.59606 19.3744 2.37383 17.9299L1.85075 14.5299C1.55764 12.6247 1.41109 11.6721 1.6938 10.9309C1.94194 10.2803 2.40865 9.73631 3.01392 9.39213C3.70353 9 4.66733 9 6.59493 9L17.4051 9Z" fill="url(#1752500502786-6297956_folder_existing_1_v5o9796uz)" data-glass="blur"></path>
          <path d="M18.6807 9.00586C19.7975 9.02423 20.4692 9.09846 20.9864 9.39258C21.5915 9.73676 22.0586 10.2802 22.3067 10.9307C22.5894 11.6719 22.4426 12.6251 22.1495 14.5303L21.626 17.9297C21.4038 19.3742 21.2926 20.097 20.9385 20.6396L20.8155 20.8135C20.5147 21.2098 20.1193 21.5262 19.6641 21.7324C19.074 21.9997 18.3431 22 16.8819 22V21.25C17.624 21.25 18.1389 21.2495 18.543 21.2188C18.9374 21.1887 19.1709 21.133 19.3546 21.0498C19.7447 20.873 20.0766 20.5882 20.3106 20.2295C20.4208 20.0606 20.5119 19.8385 20.6016 19.4531C20.6935 19.0584 20.772 18.5489 20.8848 17.8154L21.4083 14.416C21.5568 13.4504 21.6601 12.7732 21.6954 12.2441C21.7302 11.7223 21.6913 11.4231 21.6055 11.1982C21.4194 10.7103 21.0693 10.3021 20.6153 10.0439C20.4061 9.92506 20.1166 9.84086 19.5958 9.7959C19.0675 9.75031 18.3823 9.75 17.4053 9.75H6.59479C5.61785 9.75 4.93266 9.75032 4.40436 9.7959C3.88353 9.84086 3.59399 9.92504 3.38483 10.0439C2.93088 10.3021 2.5807 10.7103 2.3946 11.1982C2.30885 11.4231 2.26996 11.7223 2.30475 12.2441C2.34005 12.7732 2.44331 13.4504 2.59186 14.416L3.1153 17.8154C3.22814 18.5489 3.30665 19.0584 3.3985 19.4531C3.4882 19.8385 3.5793 20.0606 3.68952 20.2295C3.92357 20.5882 4.25545 20.873 4.64558 21.0498C4.82929 21.133 5.06268 21.1887 5.4571 21.2188C5.86121 21.2495 6.37613 21.25 7.11823 21.25V22L6.14948 21.9961C5.44148 21.9856 4.96108 21.9493 4.56452 21.8213L4.336 21.7324C3.88079 21.5262 3.48544 21.2098 3.18464 20.8135L3.06159 20.6396C2.79608 20.2327 2.66703 19.7244 2.52546 18.8867L2.37409 17.9297L1.85065 14.5303C1.57585 12.744 1.42974 11.7947 1.64558 11.0723L1.6944 10.9307C1.91158 10.3615 2.29578 9.8738 2.79401 9.53027L3.01374 9.39258C3.70332 9.00046 4.66737 9 6.59479 9H17.4053L18.6807 9.00586ZM16.8819 21.25V22H7.11823V21.25H16.8819Z" fill="url(#1752500502786-6297956_folder_existing_2_vhap9347d)"></path>
          <defs>
            <linearGradient id="1752500502786-6297956_folder_existing_0_ekojck6b3" x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#575757"></stop>
              <stop offset="1" stopColor="#151515"></stop>
            </linearGradient>
            <linearGradient id="1752500502786-6297956_folder_existing_1_v5o9796uz" x1="23" y1="15.5" x2="1" y2="15.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
              <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
            </linearGradient>
            <linearGradient id="1752500502786-6297956_folder_existing_2_vhap9347d" x1="12" y1="9" x2="12" y2="16.528" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
            </linearGradient>
            <filter id="1752500502786-6297956_folder_filter_56qas2ark" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
            </filter>
            <clipPath id="1752500502786-6297956_folder_clipPath_gygn8e14a">
              <path d="M17.4051 9C19.3327 9 20.2965 9 20.9861 9.39213C21.5914 9.73631 22.0581 10.2803 22.3062 10.9309C22.5889 11.6721 22.4424 12.6247 22.1492 14.5299L21.6262 17.9299C21.4039 19.3744 21.2928 20.0966 20.9388 20.6393C20.6267 21.1176 20.1846 21.4969 19.6644 21.7326C19.0742 22 18.3435 22 16.882 22L7.11801 22C5.65653 22 4.92579 22 4.33558 21.7326C3.8154 21.4969 3.3733 21.1176 3.06124 20.6393C2.70717 20.0966 2.59606 19.3744 2.37383 17.9299L1.85075 14.5299C1.55764 12.6247 1.41109 11.6721 1.6938 10.9309C1.94194 10.2803 2.40865 9.73631 3.01392 9.39213C3.70353 9 4.66733 9 6.59493 9L17.4051 9Z" fill="url(#1752500502786-6297956_folder_existing_1_v5o9796uz)"></path>
            </clipPath>
            <mask id="1752500502786-6297956_folder_mask_2iow0yqdp">
              <rect width="100%" height="100%" fill="#FFF"></rect>
              <path d="M17.4051 9C19.3327 9 20.2965 9 20.9861 9.39213C21.5914 9.73631 22.0581 10.2803 22.3062 10.9309C22.5889 11.6721 22.4424 12.6247 22.1492 14.5299L21.6262 17.9299C21.4039 19.3744 21.2928 20.0966 20.9388 20.6393C20.6267 21.1176 20.1846 21.4969 19.6644 21.7326C19.0742 22 18.3435 22 16.882 22L7.11801 22C5.65653 22 4.92579 22 4.33558 21.7326C3.8154 21.4969 3.3733 21.1176 3.06124 20.6393C2.70717 20.0966 2.59606 19.3744 2.37383 17.9299L1.85075 14.5299C1.55764 12.6247 1.41109 11.6721 1.6938 10.9309C1.94194 10.2803 2.40865 9.73631 3.01392 9.39213C3.70353 9 4.66733 9 6.59493 9L17.4051 9Z" fill="#000"></path>
            </mask>
          </defs>
        </g>
      </svg>
    ),
  },
  {
    name: 'motion' as TabType,
    label: 'Motion',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M7 7.74759C7 5.43142 7 4.27333 7.4746 3.45742C7.89096 2.74164 8.54761 2.19667 9.32786 1.91935C10.2173 1.60324 11.3555 1.81666 13.632 2.2435L17.7794 3.02115C19.6372 3.36948 20.5662 3.54365 21.2618 4.02058C21.8752 4.44109 22.3592 5.02427 22.6594 5.70462C23 6.47626 23 7.42135 23 9.31153V13.2524C23 15.5686 23 16.7267 22.5254 17.5426C22.109 18.2584 21.4524 18.8033 20.6721 19.0807C19.7827 19.3968 18.6445 19.1833 16.368 18.7565L12.2206 17.9789C10.3627 17.6305 9.43385 17.4563 8.73819 16.9794C8.12482 16.5589 7.64083 15.9757 7.34056 15.2954C7 14.5237 7 13.5787 7 11.6885V7.74759Z" fill="url(#1752500502804-4744372_stack-perspective_existing_0_9j5b6fsew)" data-glass="origin" mask="url(#1752500502804-4744372_stack-perspective_mask_npad53mc0)"></path>
          <path d="M7 7.74759C7 5.43142 7 4.27333 7.4746 3.45742C7.89096 2.74164 8.54761 2.19667 9.32786 1.91935C10.2173 1.60324 11.3555 1.81666 13.632 2.2435L17.7794 3.02115C19.6372 3.36948 20.5662 3.54365 21.2618 4.02058C21.8752 4.44109 22.3592 5.02427 22.6594 5.70462C23 6.47626 23 7.42135 23 9.31153V13.2524C23 15.5686 23 16.7267 22.5254 17.5426C22.109 18.2584 21.4524 18.8033 20.6721 19.0807C19.7827 19.3968 18.6445 19.1833 16.368 18.7565L12.2206 17.9789C10.3627 17.6305 9.43385 17.4563 8.73819 16.9794C8.12482 16.5589 7.64083 15.9757 7.34056 15.2954C7 14.5237 7 13.5787 7 11.6885V7.74759Z" fill="url(#1752500502804-4744372_stack-perspective_existing_0_9j5b6fsew)" data-glass="clone" filter="url(#1752500502804-4744372_stack-perspective_filter_ql7gyis96)" clipPath="url(#1752500502804-4744372_stack-perspective_clipPath_92jk82aca)"></path>
          <path d="M1 10.7476C1 8.43142 1 7.27333 1.4746 6.45742C1.89096 5.74164 2.54761 5.19667 3.32786 4.91935C4.21727 4.60324 5.35552 4.81666 7.63201 5.2435L11.7794 6.02115C13.6372 6.36948 14.5662 6.54365 15.2618 7.02058C15.8752 7.44109 16.3592 8.02427 16.6594 8.70462C17 9.47626 17 10.4213 17 12.3115V16.2524C17 18.5686 17 19.7267 16.5254 20.5426C16.109 21.2584 15.4524 21.8033 14.6721 22.0807C13.7827 22.3968 12.6445 22.1833 10.368 21.7565L6.22056 20.9789C4.36275 20.6305 3.43385 20.4563 2.73819 19.9794C2.12482 19.5589 1.64083 18.9757 1.34056 18.2954C1 17.5237 1 16.5787 1 14.6885V10.7476Z" fill="url(#1752500502804-4744372_stack-perspective_existing_1_4m8a1fwmn)" data-glass="blur"></path>
          <path d="M1 14.6885V10.7481C1 8.57654 0.999508 7.42228 1.39062 6.61426L1.47461 6.45704C1.83885 5.83099 2.3872 5.33599 3.04102 5.03614L3.32812 4.91895C4.21745 4.60304 5.3558 4.81641 7.63184 5.24317L11.7793 6.02149C13.637 6.36981 14.5661 6.54364 15.2617 7.02051C15.8751 7.44103 16.3589 8.02473 16.6592 8.70509C16.9996 9.47667 17 10.4216 17 12.3115V16.252C17 18.5681 17 19.7271 16.5254 20.543L16.3584 20.8027C15.9431 21.3904 15.3546 21.8384 14.6719 22.0811L14.502 22.1338C13.8668 22.3064 13.0878 22.2377 11.876 22.0313L10.3682 21.7568L6.2207 20.9785C4.47875 20.6519 3.55318 20.479 2.87109 20.0654L2.73828 19.9795C2.20164 19.6116 1.76409 19.119 1.46191 18.5459L1.34082 18.2949C1.08554 17.7163 1.02085 17.0404 1.00488 15.9414L1 14.6885ZM1.75 14.6885C1.75 15.6447 1.75005 16.3209 1.79004 16.8555C1.82931 17.3803 1.9042 17.7152 2.02637 17.9922C2.27028 18.5449 2.66391 19.0187 3.16211 19.3604C3.41188 19.5316 3.72743 19.6673 4.23633 19.8027C4.75432 19.9406 5.41869 20.066 6.3584 20.2422L10.5059 21.0195C11.6573 21.2354 12.4741 21.3879 13.1143 21.4512C13.7475 21.5137 14.127 21.4785 14.4209 21.374C15.0339 21.1561 15.5498 20.7274 15.877 20.165C16.0338 19.8954 16.1381 19.5285 16.1934 18.8945C16.2491 18.2537 16.25 17.4232 16.25 16.252V12.3115C16.25 11.3553 16.25 10.6791 16.21 10.1445C16.1707 9.61967 16.0958 9.28479 15.9736 9.00782C15.7297 8.45516 15.3361 7.9813 14.8379 7.63966C14.5881 7.46842 14.2726 7.33266 13.7637 7.19727C13.2457 7.05946 12.5813 6.93401 11.6416 6.75782L7.49414 5.98048C6.34266 5.76457 5.52593 5.61207 4.88574 5.54884C4.25249 5.48631 3.87304 5.52153 3.5791 5.62598C2.96605 5.84387 2.45018 6.27257 2.12305 6.83497C1.96625 7.10465 1.86187 7.47148 1.80664 8.10548C1.75085 8.74629 1.75 9.57679 1.75 10.7481V14.6885Z" fill="url(#1752500502804-4744372_stack-perspective_existing_2_gj8gaetpw)"></path>
          <defs>
            <linearGradient id="1752500502804-4744372_stack-perspective_existing_0_9j5b6fsew" x1="15" y1="1" x2="15" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#575757"></stop>
              <stop offset="1" stopColor="#151515"></stop>
            </linearGradient>
            <linearGradient id="1752500502804-4744372_stack-perspective_existing_1_4m8a1fwmn" x1="9" y1="4" x2="9" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
              <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
            </linearGradient>
            <linearGradient id="1752500502804-4744372_stack-perspective_existing_2_gj8gaetpw" x1="9" y1="4.768" x2="9" y2="14.881" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
            </linearGradient>
            <filter id="1752500502804-4744372_stack-perspective_filter_ql7gyis96" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
            </filter>
            <clipPath id="1752500502804-4744372_stack-perspective_clipPath_92jk82aca">
              <path d="M1 10.7476C1 8.43142 1 7.27333 1.4746 6.45742C1.89096 5.74164 2.54761 5.19667 3.32786 4.91935C4.21727 4.60324 5.35552 4.81666 7.63201 5.2435L11.7794 6.02115C13.6372 6.36948 14.5662 6.54365 15.2618 7.02058C15.8752 7.44109 16.3592 8.02427 16.6594 8.70462C17 9.47626 17 10.4213 17 12.3115V16.2524C17 18.5686 17 19.7267 16.5254 20.5426C16.109 21.2584 15.4524 21.8033 14.6721 22.0807C13.7827 22.3968 12.6445 22.1833 10.368 21.7565L6.22056 20.9789C4.36275 20.6305 3.43385 20.4563 2.73819 19.9794C2.12482 19.5589 1.64083 18.9757 1.34056 18.2954C1 17.5237 1 16.5787 1 14.6885V10.7476Z" fill="url(#1752500502804-4744372_stack-perspective_existing_1_4m8a1fwmn)"></path>
            </clipPath>
            <mask id="1752500502804-4744372_stack-perspective_mask_npad53mc0">
              <rect width="100%" height="100%" fill="#FFF"></rect>
              <path d="M1 10.7476C1 8.43142 1 7.27333 1.4746 6.45742C1.89096 5.74164 2.54761 5.19667 3.32786 4.91935C4.21727 4.60324 5.35552 4.81666 7.63201 5.2435L11.7794 6.02115C13.6372 6.36948 14.5662 6.54365 15.2618 7.02058C15.8752 7.44109 16.3592 8.02427 16.6594 8.70462C17 9.47626 17 10.4213 17 12.3115V16.2524C17 18.5686 17 19.7267 16.5254 20.5426C16.109 21.2584 15.4524 21.8033 14.6721 22.0807C13.7827 22.3968 12.6445 22.1833 10.368 21.7565L6.22056 20.9789C4.36275 20.6305 3.43385 20.4563 2.73819 19.9794C2.12482 19.5589 1.64083 18.9757 1.34056 18.2954C1 17.5237 1 16.5787 1 14.6885V10.7476Z" fill="#000"></path>
            </mask>
          </defs>
        </g>
      </svg>
    ),
  },
];

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState<TabType>('visuals');
  const projects = getAllProjects();
  const visuals = visualsData as Visual[];
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const containerWidth = container.offsetWidth;

        if (containerWidth > 0) {
          const clipLeft = (offsetLeft / containerWidth) * 100;
          const clipRight = ((containerWidth - (offsetLeft + offsetWidth)) / containerWidth) * 100;
          
          container.style.clipPath = `inset(0 ${clipRight.toFixed(2)}% 0 ${clipLeft.toFixed(2)}% round 9999px)`;
        }
      }
    }
  }, [activeTab]);

  return (
    <section className="pt-12 pb-16">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <div className="relative bg-gray-50 rounded-full p-1 flex gap-0">
            {/* Base layer - inactive tabs */}
            <div className="flex gap-0">
              {TABS.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className="px-4 py-1 rounded-full text-[14px] leading-[20px] font-medium text-gray-400 flex items-center gap-2"
                >
                  <span className="w-[18px] h-[18px] flex-shrink-0" style={{ mixBlendMode: 'exclusion' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overlay layer - active tab with clip-path */}
            <div
              ref={containerRef}
              className="absolute top-1 left-1 right-1 bottom-1 overflow-hidden"
              style={{
                transition: 'clip-path 0.25s ease-out',
              }}
            >
              <div className="flex gap-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.name}
                    ref={activeTab === tab.name ? activeTabElementRef : null}
                    onClick={() => setActiveTab(tab.name)}
                    className="px-4 py-1 rounded-full text-[14px] leading-[20px] font-medium bg-white text-gray-600 flex items-center gap-2"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <span className="w-[18px] h-[18px] flex-shrink-0">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          {activeTab === 'visuals' && (
            <div className="border border-gray-200 rounded-[40px] p-2.5">
              <div className="bg-gray-50 rounded-[32px] p-2.5">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="aspect-[1048/654] w-full">
                    <CldImage
                      src="portfolio/visuals-gallery"
                      alt="Visuals Gallery"
                      width={1048}
                      height={654}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center max-w-[600px] mx-auto">
              {projects.slice(0, 4).map((project) => {
                // Use folderImages for folder cards - expects full Cloudinary URLs
                // Fallback to images or image if folderImages not available (constructs URLs for backward compatibility)
                const folderImages = project.folderImages
                  ? project.folderImages
                  : project.images
                  ? project.images.map((img) => {
                      // If it's already a full URL, use as-is
                      if (img.startsWith('http')) return img;
                      // Otherwise construct URL from public ID (fallback)
                      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfwi6dpkz';
                      return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${img.startsWith('portfolio/') ? img : `portfolio/${img}`}`;
                    })
                  : (() => {
                      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfwi6dpkz';
                      return [`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/portfolio/${project.image}`];
                    })();

                // Ensure we have at least 5 images for the stack (repeat if needed)
                const images = Array.from({ length: 5 }, (_, i) => 
                  folderImages[i % folderImages.length]
                );

                return (
                  <FolderCard
                    key={project.id}
                    title={project.title}
                    images={images}
                    platform={project.platform}
                    tags={project.tags}
                    comingSoon={project.comingSoon}
                    width={288}
                    onClick={project.comingSoon ? undefined : () => router.push(`/projects/${project.slug}`)}
                  />
                );
              })}
            </div>
          )}

          {activeTab === 'motion' && (
            <div className="border border-gray-200 rounded-[40px] p-2.5">
              <div className="bg-gray-50 rounded-[32px] p-2.5">
                <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[400px] flex flex-col items-center justify-center gap-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-gray-900 font-medium mb-2">Interactive Animations</p>
                    <p className="text-gray-600 text-sm">
                      Motion collection with Framer Motion
                    </p>
                  </motion.div>
                  <div className="flex gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-gray-100 rounded-xl cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
