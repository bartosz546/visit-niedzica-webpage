import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Utils } from '../../Utils';

@Component({
  selector: 'app-parallax-video-scroll-section',
  imports: [],
  templateUrl: './parallax-video-scroll-section.html',
  styleUrl: './parallax-video-scroll-section.css',
})
export class ParallaxVideoScrollSection implements AfterViewInit {
  @ViewChild('backgroundVideoPlayer') player!: ElementRef<HTMLVideoElement>;
  @ViewChild('nextPlayer') nextPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('fadeLayer') fadeLayer!: ElementRef<HTMLElement>;

  @Input() videos: Array<string> = [];
  @Input() header!: string;
  @Input() subheader!: string;

  private currentVideoIndex = -1;
  private fadeTransitionTime = 500;

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
