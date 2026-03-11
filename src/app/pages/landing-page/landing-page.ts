import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Utils } from '../../Utils';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements AfterViewInit {
  @ViewChild('backgroundVideoPlayer') player!: ElementRef<HTMLVideoElement>;
  @ViewChild('nextPlayer') nextPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('fadeLayer') fadeLayer!: ElementRef<HTMLElement>;

  private currentVideoIndex = -1;
  private fadeTransitionTime = 500;
  private readonly videos = [
    'assets/videos/niedzica-drone-footage-1.mp4',
    'assets/videos/niedzica-drone-footage-2.mp4',
    'assets/videos/niedzica-drone-footage-3.mp4',
    'assets/videos/niedzica-drone-footage-4.mp4',
  ];

  ngAfterViewInit(): void {
    (window as any).onHeliosTemplateReady();
    const video: HTMLVideoElement = this.player.nativeElement as HTMLVideoElement;
    video.addEventListener('ended', this.playVideo.bind(this, video));
    this.playVideo(video).then();
  }

  private async playVideo(video: HTMLVideoElement) {
    if (this.currentVideoIndex >= 0) {
      await this.fadeToBlack();
    }
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    video.src = this.videos[this.currentVideoIndex];
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.play().catch((err) => {
      console.error('Playback failed:', err);
    });
    this.preloadNext();
  }

  private preloadNext(): void {
    const next = this.nextPlayer.nativeElement;
    const nextIndex = (this.currentVideoIndex + 1) % this.videos.length;

    next.src = this.videos[nextIndex];
    next.load();
  }

  private fadeToBlack(): Promise<void> {
    const layer = this.fadeLayer.nativeElement;
    requestAnimationFrame(async () => {
      layer.classList.add('visible');
      await Utils.setTimeoutAsync(this.fadeTransitionTime);
      console.log('fade out removed');
      layer.classList.remove('visible');
    });

    return new Promise((resolve) => {
      setTimeout(resolve, this.fadeTransitionTime);
    });
  }
}
