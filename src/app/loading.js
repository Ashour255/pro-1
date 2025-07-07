export default function Loading() {
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="loading-page">
      <div className="container">
        <div className="row">
          {skeletons.map((skeleton) => (
            <div key={skeleton} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="skeleton-wrapper">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className="loading-page">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <div class="skeleton-wrapper">
              <div class="skeleton-image"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
