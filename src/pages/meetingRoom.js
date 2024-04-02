import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting),
  {
    ssr: false,
  }
);

const ColanMeet = () => {

  const router = useRouter();

  const MeetingRoomLink = router.query.roomid;
  // console.log(router.query.roomid, "test");

  const handleApiReady = (externalApi) => {

    externalApi.addEventListener("readyToClose", () => {
      window.location.href = "/home/user";
    });

    externalApi.addEventListener('participantJoined', (participant) => {
      try {
        console.log("participant", participant);

        if (isCreator) {
          console.log(`${participant.displayName} is the meeting creator and moderator.`);
        } else {
          const shouldAllow = window.confirm(`Allow ${participant.displayName} to join the meeting?`);

          if (!shouldAllow) {
            externalApi.executeCommand('kickParticipant', participant.id);
          }
        }

        isCreator = false;
      } catch (error) {
        console.error('Error handling participantJoined event:', error);
      }
    });


    

    const handleIFrameRef = (iframeRef) => {
      if (iframeRef) {
        iframeRef.style.height = "99vh";
      }
    };

    return (
      <div>
        {MeetingRoomLink ? (
          <JitsiMeeting
            domain="meet-jitsi.colan.in"
            roomName={MeetingRoomLink}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false,
              enableWelcomePage: true,
              startRecording: true,
              prejoinPageEnabled: true,
              enableLobby: true,
              mobileAppPromo: false,
              filmStripOnly: false,
              FILM_STRIP_MAX_HEIGHT: 80,
            }}
            interfaceConfigOverwrite={{
              LOBBY_BUTTON_TEXT: "Join Lobby",
              LOBBY_ADDITIONAL_BUTTONS: [
                {
                  text: "Request to Join",
                  onClick: () => {
                    // send a request to the meeting host to join the meeting
                  },
                },
              ],
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
              APP_NAME: "Colan Meet",
              DEFAULT_BACKGROUND: "grey",
              TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'filetransfer',
                'recording',
                'livestreaming',
                'etherpad',
                'sharedvideo',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
                'feedback',
                'stats',
                'shortcuts',
                'tileview',
                'videobackgroundblur',
                'download',
                'help',
                'mute-everyone',
                'security'
              ],

            }}
            userInfo={{
              displayName: "YOUR_USERNAME",
            }}
            onApiReady={handleApiReady}
            getIFrameRef={handleIFrameRef}
          />
        ) : (
          <p>...loading</p>
        )}
      </div>
    );
  }
}

export default ColanMeet;
