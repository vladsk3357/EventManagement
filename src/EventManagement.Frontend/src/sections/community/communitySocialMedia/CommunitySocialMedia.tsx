import { Link, Stack, Typography, SvgIcon } from '@mui/material';
import type { SocialMedia } from '../types';
import XIcon from '@mui/icons-material/X';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FaDiscord } from "react-icons/fa";
import { FaSlack } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

type Props = {
  socialMedia: SocialMedia;
};

const CommunitySocialMedia = ({ socialMedia }: Props) => {
  const {
    websiteUrl,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    instagramUrl,
    youtubeUrl,
    discordUrl,
    slackUrl,
    twitchUrl,
    mediumUrl,
    tikTokUrl,
    telegramUrl,
  } = socialMedia;
  return (
    <Stack direction="row" spacing={2}>
      {websiteUrl && (
        <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
          <LanguageIcon />
        </Link>
      )}
      {facebookUrl && (
        <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </Link>
      )}
      {twitterUrl && (
        <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <XIcon />
        </Link>
      )}
      {linkedinUrl && (
        <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </Link>
      )}
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </Link>
      )}
      {youtubeUrl && (
        <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon />
        </Link>
      )}
      {discordUrl && (
        <Link href={discordUrl} target="_blank" rel="noopener noreferrer">
          {/* <SvgIcon component={DiscordIcon} ></SvgIcon> */}
          <FaDiscord size={24} />
        </Link>
      )}
      {slackUrl && (
        <Link href={slackUrl} target="_blank" rel="noopener noreferrer">
          <FaSlack size={24} />
        </Link>
      )}
      {twitchUrl && (
        <Link href={twitchUrl} target="_blank" rel="noopener noreferrer">
          <FaTwitch size={24} />
        </Link>
      )}
      {mediumUrl && (
        <Link href={mediumUrl} target="_blank" rel="noopener noreferrer">
          <FaMedium size={24} />
        </Link>
      )}
      {tikTokUrl && (
        <Link href={tikTokUrl} target="_blank" rel="noopener noreferrer">
          <FaTiktok size={24} />
        </Link>
      )}
      {telegramUrl && (
        <Link href={telegramUrl} target="_blank" rel="noopener noreferrer">
          <TelegramIcon />
        </Link>
      )}
    </Stack>
  );
};

export default CommunitySocialMedia;
