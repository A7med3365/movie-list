import { Avatar } from '../catalyst-ui-kit/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '../catalyst-ui-kit/dropdown';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '../catalyst-ui-kit/sidebar';
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  FilmIcon,
  HomeIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  TvIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import movieClapperboard from '../../assets/movie-clapperboard.svg';

const SidebarComponent = () => (
  <Sidebar>
    <SidebarHeader>
      <SidebarSection className="max-lg:hidden">
        <SidebarItem href="/search">
          <Avatar src={movieClapperboard} />
          <SidebarLabel>Tailwind Labs</SidebarLabel>
          {/* <ChevronDownIcon /> */}
        </SidebarItem>
      </SidebarSection>
      <SidebarSection className="max-lg:hidden">
        <SidebarItem href="/search">
          <MagnifyingGlassIcon />
          <SidebarLabel>Search</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/inbox">
          <StarIcon />
          <SidebarLabel>Favorites</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarHeader>
    <SidebarBody>
      <SidebarSection>
        <SidebarItem href="/">
          <HomeIcon />
          <SidebarLabel>Home</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/movies">
          <FilmIcon />
          <SidebarLabel>Movies</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/tv">
          <TvIcon />
          <SidebarLabel>TV Shows</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/posts">
          <ChatBubbleBottomCenterTextIcon />
          <SidebarLabel>Posts</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
      <SidebarSection className="max-lg:hidden">
        <SidebarHeading>Featured stuff</SidebarHeading>
        <SidebarItem href="/details/194764?type=tv">The Penguin</SidebarItem>
        <SidebarItem href="/details/1396?type=tv">Breaking Bad</SidebarItem>
        <SidebarItem href="/details/94605?type=tv">Arcane</SidebarItem>
        <SidebarItem href="/details/88803?type=tv">Vinland Saga</SidebarItem>
      </SidebarSection>
      <SidebarSpacer />
      <SidebarSection>
        <SidebarItem href="/support">
          <QuestionMarkCircleIcon />
          <SidebarLabel>Support</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarBody>
    <SidebarFooter className="max-lg:hidden">
      <Dropdown>
        <DropdownButton as={SidebarItem}>
          <span className="flex min-w-0 items-center gap-3">
            <Avatar
              src="/profile-photo.jpg"
              className="size-10"
              square
              alt=""
            />
            <span className="min-w-0">
              <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                Erica
              </span>
              <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                erica@example.com
              </span>
            </span>
          </span>
          <ChevronUpIcon />
        </DropdownButton>
        <DropdownMenu className="min-w-64" anchor="top start">
          <DropdownItem href="/my-profile">
            <UserIcon />
            <DropdownLabel>My profile</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="/settings">
            <Cog8ToothIcon />
            <DropdownLabel>Settings</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/privacy-policy">
            <ShieldCheckIcon />
            <DropdownLabel>Privacy policy</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="/share-feedback">
            <LightBulbIcon />
            <DropdownLabel>Share feedback</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/logout">
            <ArrowRightStartOnRectangleIcon />
            <DropdownLabel>Sign out</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </SidebarFooter>
  </Sidebar>
);

export default SidebarComponent;