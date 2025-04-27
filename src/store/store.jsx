import { configureStore } from '@reduxjs/toolkit';
import { hotelsApiSlice } from './hotels/hotelsApiSlice';
import { hotelDetailsApiSlice } from './hotels/hotelDetailsApiSlice';
import { AllTripsSlice } from './trips/AllTripsSlice';
import { TripsDetailsSlice } from './trips/TripsDetailsSlice';
import { RegisterTouristApiSlice } from './register/RegisterTouristApiSlice';
import { AllTourGuideApiSlice } from './tourGuide/AllTourGuideApiSlice';
import { VerifyOtpApiSlice } from './register/VerifyOtpApiSlice';
import { RegisterTourGuideApiSlice } from './register/RegisterTourGuideApiSlice';
import { LoginApiSlice } from './login/LoginApiSlice';
import { AlllanguagesSlice } from './languages/AlllanguagesSlice';
import { AboutPageSlice } from './pages/AboutPageSlice';
import { MicePageSlice } from './pages/MicePageSlice';
import { PrivacyPageSlice } from './pages/PrivacyPageSlice';
import { TermsPageSlice } from './pages/TermsPageSlice';
import { FaqPageSlice } from './pages/FaqPageSlice';
import { HomePageSlice } from './HomePage/HomePageSlice';
import { BlogsPageSlice } from './pages/BlogsPageSlice';
import { BlogsDetailsSlice } from './pages/BlogsDetailsSlice';
import { AllTransportationSlice } from './Transportation/AllTransportationSlice';
import { TransDetailsSlice } from './Transportation/TransDetailsSlice';
import { CarAgencySlice } from './Transportation/CarAgencySlice';
import { DestinationDetailsSlice } from './HomePage/DestinationDetailsSlice';
import { StateDetailsSlice } from './States/StateDetailsSlice';
import { SitesCategorySlice } from './States/SitesCategorySlice';
import { AgencyDetailsSlice } from './Agency/AgencyDetailsSlice';
import { AgencySlice } from './Agency/AgencySlice';
import { HotelsByDestinationSlice } from './hotels/HotelsByDestinationSlice';
import { SitesByStateByCategorySlice } from './States/SitesByStateByCategotySlice';
import { siteDetailApi } from './States/siteDetailApi';
import { GuideByDestinationSlice } from './tourGuide/GuideByDestinationSlice';
import { TourGuideDetailsSlice } from './tourGuide/TourGuideDetailsSlice';
import { CountriesApiSlice } from './Countries/CountriesSlice';
import { GuideLanguageSlice } from './languages/GuideLanguageSlice';
import { CitiesApiSlice } from './Cities/CitiesSlice';
import { GuideBookSlice } from './Booking/GuideBookSlice';
import { RegisterTransportationApiSlice } from './register/RegisterTransportationApiSlice';
import { RegisterAgencyApiSlice } from './register/RegisterAgencyApiSlice';
import { TripBookingSlice } from './Booking/TripBookingSlice';
import { PaymentMethodSlice } from './PaymentMethods/PaymentMethodsSlice';
import { AllGuideBookingsSlice } from './tourGuide/AllGuideBookingsSlice';
import { AcceptBookSlice } from './tourGuide/AcceptBookSlice';
import { CancelBookSlice } from './tourGuide/CancelBookSlice';
import { PaymentSlice } from './Booking/PaymentSlice';
import { checkPaymentStatus } from './Booking/checkPaymentStatus';
import { AgencyTripSlice } from './Agency/AgencyTripSlice';
import { CarDetailSlice } from './Transportation/CarDetailSlice';
import { UserDataSlice } from './User/UserDataSlice';
import { SubscribeSlice } from './Booking/SubscribeSlice';
import { ContactSlice } from './Contact/ContactSlice';
import { GetContactDataSlice } from './Contact/GetContactDataSlice';
import { ApplyCodeUserSlice } from './Booking/ApplyCodeUserSlice';
import { SearchSlice } from './Search/SearchSlice';
import { forgetPasswordSlice } from './forgetPassword/forgetPassSlice';
import { resetPasswordSlice } from './forgetPassword/resetPassSlice';
import { ResendOtpApiSlice } from './forgetPassword/resendOtp';
import { TourGuideDaysSlice } from './tourGuide/TourGuideDaysSlice';
import { FooterDataSlice } from './Footer/FooterDataSlice';
import { AllStatesSlice } from './States/AllStatesSlice';

export const store = configureStore({
    reducer: {
        [hotelsApiSlice.reducerPath]: hotelsApiSlice.reducer,
        [hotelDetailsApiSlice.reducerPath]: hotelDetailsApiSlice.reducer,
        [AllTripsSlice.reducerPath]: AllTripsSlice.reducer,
        [TripsDetailsSlice.reducerPath]: TripsDetailsSlice.reducer,
        [RegisterTouristApiSlice.reducerPath]: RegisterTouristApiSlice.reducer,
        [AllTourGuideApiSlice.reducerPath]: AllTourGuideApiSlice.reducer,
        [VerifyOtpApiSlice.reducerPath]: VerifyOtpApiSlice.reducer,
        [RegisterTourGuideApiSlice.reducerPath]: RegisterTourGuideApiSlice.reducer,
        [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
        [AlllanguagesSlice.reducerPath]: AlllanguagesSlice.reducer,
        [AboutPageSlice.reducerPath]: AboutPageSlice.reducer,
        [MicePageSlice.reducerPath]: MicePageSlice.reducer,
        [PrivacyPageSlice.reducerPath]: PrivacyPageSlice.reducer,
        [TermsPageSlice.reducerPath]: TermsPageSlice.reducer,
        [FaqPageSlice.reducerPath]: FaqPageSlice.reducer,
        [HomePageSlice.reducerPath]: HomePageSlice.reducer,
        [BlogsPageSlice.reducerPath]: BlogsPageSlice.reducer,
        [BlogsDetailsSlice.reducerPath]: BlogsDetailsSlice.reducer,
        [AllTransportationSlice.reducerPath]: AllTransportationSlice.reducer,
        [TransDetailsSlice.reducerPath]: TransDetailsSlice.reducer,
        [CarAgencySlice.reducerPath]: CarAgencySlice.reducer,
        [DestinationDetailsSlice.reducerPath]: DestinationDetailsSlice.reducer,
        [StateDetailsSlice.reducerPath]: StateDetailsSlice.reducer,
        [SitesCategorySlice.reducerPath]: SitesCategorySlice.reducer,
        [AgencyDetailsSlice.reducerPath]: AgencyDetailsSlice.reducer,
        [AgencySlice.reducerPath]: AgencySlice.reducer,
        [HotelsByDestinationSlice.reducerPath]: HotelsByDestinationSlice.reducer,
        [SitesByStateByCategorySlice.reducerPath]: SitesByStateByCategorySlice.reducer,
        [siteDetailApi.reducerPath]: siteDetailApi.reducer,
        [GuideByDestinationSlice.reducerPath]: GuideByDestinationSlice.reducer,
        [TourGuideDetailsSlice.reducerPath]: TourGuideDetailsSlice.reducer,
        [CountriesApiSlice.reducerPath]: CountriesApiSlice.reducer,
        [GuideLanguageSlice.reducerPath]: GuideLanguageSlice.reducer,
        [CitiesApiSlice.reducerPath]: CitiesApiSlice.reducer,
        [GuideBookSlice.reducerPath]: GuideBookSlice.reducer,
        [RegisterTransportationApiSlice.reducerPath]: RegisterTransportationApiSlice.reducer,
        [RegisterAgencyApiSlice.reducerPath]: RegisterAgencyApiSlice.reducer,
        [TripBookingSlice.reducerPath]: TripBookingSlice.reducer,
        [PaymentMethodSlice.reducerPath]: PaymentMethodSlice.reducer,
        [AllGuideBookingsSlice.reducerPath]: AllGuideBookingsSlice.reducer,
        [AcceptBookSlice.reducerPath]: AcceptBookSlice.reducer,
        [CancelBookSlice.reducerPath]: CancelBookSlice.reducer,
        [PaymentSlice.reducerPath]: PaymentSlice.reducer,
        [checkPaymentStatus.reducerPath]: checkPaymentStatus.reducer,
        [AgencyTripSlice.reducerPath]: AgencyTripSlice.reducer,
        [CarDetailSlice.reducerPath]: CarDetailSlice.reducer,
        [UserDataSlice.reducerPath]: UserDataSlice.reducer,
        [SubscribeSlice.reducerPath]: SubscribeSlice.reducer,
        [ContactSlice.reducerPath]: ContactSlice.reducer,
        [GetContactDataSlice.reducerPath]: GetContactDataSlice.reducer,
        [ApplyCodeUserSlice.reducerPath]: ApplyCodeUserSlice.reducer,
        [SearchSlice.reducerPath]: SearchSlice.reducer,
        [forgetPasswordSlice.reducerPath]: forgetPasswordSlice.reducer,
        [resetPasswordSlice.reducerPath]: resetPasswordSlice.reducer,
        [ResendOtpApiSlice.reducerPath]: ResendOtpApiSlice.reducer,
        [TourGuideDaysSlice.reducerPath]: TourGuideDaysSlice.reducer,
        [FooterDataSlice.reducerPath]: FooterDataSlice.reducer,
        [AllStatesSlice.reducerPath]: AllStatesSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(hotelsApiSlice.middleware)
            .concat(AllStatesSlice.middleware)
            .concat(hotelDetailsApiSlice.middleware)
            .concat(AllTripsSlice.middleware)
            .concat(TripsDetailsSlice.middleware)
            .concat(RegisterTouristApiSlice.middleware)
            .concat(AllTourGuideApiSlice.middleware)
            .concat(VerifyOtpApiSlice.middleware)
            .concat(RegisterTourGuideApiSlice.middleware)
            .concat(LoginApiSlice.middleware)
            .concat(AlllanguagesSlice.middleware)
            .concat(AboutPageSlice.middleware)
            .concat(MicePageSlice.middleware)
            .concat(PrivacyPageSlice.middleware)
            .concat(TermsPageSlice.middleware)
            .concat(FaqPageSlice.middleware)
            .concat(HomePageSlice.middleware)
            .concat(BlogsPageSlice.middleware)
            .concat(BlogsDetailsSlice.middleware)
            .concat(AllTransportationSlice.middleware)
            .concat(TransDetailsSlice.middleware)
            .concat(CarAgencySlice.middleware)
            .concat(StateDetailsSlice.middleware)
            .concat(DestinationDetailsSlice.middleware)
            .concat(SitesCategorySlice.middleware)
            .concat(AgencyDetailsSlice.middleware)
            .concat(AgencySlice.middleware)
            .concat(HotelsByDestinationSlice.middleware)
            .concat(siteDetailApi.middleware)
            .concat(SitesByStateByCategorySlice.middleware)
            .concat(GuideByDestinationSlice.middleware)
            .concat(TourGuideDetailsSlice.middleware)
            .concat(CountriesApiSlice.middleware)
            .concat(GuideLanguageSlice.middleware)
            .concat(CitiesApiSlice.middleware)
            .concat(GuideBookSlice.middleware)
            .concat(RegisterTransportationApiSlice.middleware)
            .concat(RegisterAgencyApiSlice.middleware)
            .concat(TripBookingSlice.middleware)
            .concat(AllGuideBookingsSlice.middleware)
            .concat(AcceptBookSlice.middleware)
            .concat(CancelBookSlice.middleware)
            .concat(PaymentSlice.middleware)
            .concat(checkPaymentStatus.middleware)
            .concat(AgencyTripSlice.middleware)
            .concat(CarDetailSlice.middleware)
            .concat(UserDataSlice.middleware)
            .concat(SubscribeSlice.middleware)
            .concat(ContactSlice.middleware)
            .concat(GetContactDataSlice.middleware)
            .concat(ApplyCodeUserSlice.middleware)
            .concat(SearchSlice.middleware)
            .concat(forgetPasswordSlice.middleware)
            .concat(resetPasswordSlice.middleware)
            .concat(ResendOtpApiSlice.middleware)
            .concat(TourGuideDaysSlice.middleware)
            .concat(FooterDataSlice.middleware)
            .concat(PaymentMethodSlice.middleware),
});
