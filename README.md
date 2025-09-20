# Mini-aplikacja Angular – zadanie rekrutacyjne

## Wymagania

- **Framework:** Angular 20
- **Komponenty:** standalone components
- **Stan:** signals
- **Change detection:** zoneless (`provideZonelessChangeDetection()`)
- **Style:** TailwindCSS v4 (theme, zmienne, flexbox)
- **Architektura:** lazy loading feature’ów
- **Asynchroniczność:** RxJS + HttpClient
- **Loader:** skeleton / spinner
- **Animacje:** `@angular/animations` z `@animate.enter` / `@animate.leave`
- **Responsywność:** mobile-first + desktop

## Struktura katalogów, komponenty i serwisy

- app
  - services
    - api.service
    - store.service
  - shared
    - models
    - utils
  - features
    - posts
      - posts-list
      - post-details-dialog
      - post-filters
      - favorite-toggle

Stan zarządzany wyłącznie przy pomocy serwisów i sygnałów.
