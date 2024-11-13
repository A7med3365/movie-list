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
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../catalyst-ui-kit/button';
import { avatars } from '../../assets/avatar/avatar';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router-dom';

const SidebarComponent = () => {
  const { isSignedIn, currentUser, signOut } = useContext(AuthContext);
  const nav = useNavigate();
  const { doRequest: callSignOut } = useRequest({
    url: '/api/auth/signout',
    method: 'post',
    onSuccess: () => {
      signOut();
      nav('/');
    },
  });

  useEffect(() => {
    // console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    // console.log(isSignedIn);
  }, [isSignedIn]);
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem href="/">
            <Avatar src={movieClapperboard} />
            <SidebarLabel>TMDB</SidebarLabel>
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
          <SidebarItem>
            <QuestionMarkCircleIcon />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        {isSignedIn ? (
          <Dropdown>
            <DropdownButton as={SidebarItem}>
              <span className="flex min-w-0 items-center gap-3">
                <Avatar
                  src={
                    currentUser?.avatarIndex !== undefined
                      ? avatars[currentUser.avatarIndex]
                      : avatars[0]
                  }
                  className="size-10"
                  square
                  alt=""
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {currentUser?.username}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {currentUser?.email}
                  </span>
                </span>
              </span>
              <ChevronUpIcon />
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="top start">
              <DropdownItem>
                <UserIcon />
                <DropdownLabel>My profile</DropdownLabel>
              </DropdownItem>
              <DropdownItem>
                <Cog8ToothIcon />
                <DropdownLabel>Settings</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem>
                <ShieldCheckIcon />
                <DropdownLabel>Privacy policy</DropdownLabel>
              </DropdownItem>
              <DropdownItem>
                <LightBulbIcon />
                <DropdownLabel>Share feedback</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => callSignOut()}>
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <SidebarItem href="/signin">
            <Button color="indigo" style={{ width: '100%' }}>
              Sign in
            </Button>
          </SidebarItem>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
