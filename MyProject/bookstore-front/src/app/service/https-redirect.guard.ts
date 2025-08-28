import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const httpsRedirectGuard: CanActivateFn = (route, state) => {
  if (location.protocol !== 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    return false;
  }
  return true;
};
