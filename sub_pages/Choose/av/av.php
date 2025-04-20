<?php
    session_start();
    if(isset($_POST['1'])){
        $_SESSION["tence_page"] = "1";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['2'])){
        $_SESSION["tence_page"] = "2";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['3'])){
        $_SESSION["tence_page"] = "3";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['4'])){
        $_SESSION["tence_page"] = "4";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['5'])){
        $_SESSION["tence_page"] = "5";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['6'])){
        $_SESSION["tence_page"] = "6";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['7'])){
        $_SESSION["tence_page"] = "7";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['8'])){
        $_SESSION["tence_page"] = "8";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['9'])){
        $_SESSION["tence_page"] = "9";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['10'])){
        $_SESSION["tence_page"] = "10";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['11'])){
        $_SESSION["tence_page"] = "11";
        header("Location: ./ex/ex.php");
    }
    if(isset($_POST['12'])){
        $_SESSION["tence_page"] = "12";
        header("Location: ./ex/ex.php");
    }
?>

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Responsive Card Slider</title>
        <link rel="stylesheet" href="css/swiper-bundle.min.css">
        <link rel="stylesheet" href="css/all.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/nav.css">
        <link rel="stylesheet" href="css/new_style.css">
                                        
    </head>
    <body>
        <nav class="navbar">
            <div class="content">
              <div class="logo">
                    <a href="index.html">AlphabetZ</a>
              </div>
              <ul class="menu-list">
                <div class="icon cancel-btn">
                    <i class="fas fa-times"></i>
                </div>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../soon/soon.html">About</a></li>
                <li><a href="../Start/start.html">All Tenses</a></li>
                <li><a href="../soon/soon.html">Quiz</a></li>
                <li><a href="../soon/soon.html">Contact</a></li>
              </ul>
              <div class="icon menu-btn">
                    <i class="fas fa-bars"></i>
              </div>
            </div>
        </nav>
        <div class="about">
        <div class="h1">
            <h1>Active voice</h1>
        </div>
        <form action="index.php" method="post">
        <div class="slide-container swiper">
            <div class="slide-content">
                <form action="index.php" method="post"></form>
                <div class="card-wrapper swiper-wrapper">
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile1.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Present Simple Tense(A.V)</h2>
                            <a><button class="button" name="1" type="submit" >View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>
                            <div class="card-image">
                                <img src="images/profile2.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Present Continuous Tense(A.V)</h2>
                            <a  ><button class="button" name="2" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile3.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Present Perfect Tense(A.V)</h2>

                            <a><button class="button" name="3" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile4.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Present Perfect Continuous Tense(A.V)</h2>

                            <a   ><button class="button" name="4" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile5.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Simple Past Tense(A.V)</h2>

                            <a   ><button class="button" name="5" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile6.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Past Continuous Tense(A.V)</h2>

                            <a   ><button class="button" name="6" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile7.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Past Perfect Tense(A.V)</h2>

                            <a   ><button class="button" name="7" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile8.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Past Perfect Continuous Tenses(A.V)</h2>

                            <a   ><button class="button" name="8" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile9.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Simple Future Tense(A.V)</h2>

                            <a   ><button class="button" name="9" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile9.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Future Continuous Tense(A.V)</h2>

                            <a   ><button class="button" name="10" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile9.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Future Perfect Tense(A.V)</h2>

                            <a   ><button class="button" name="11" type="submit">View More</button></a>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src="images/profile9.jpg" alt="" class="card-img">
                            </div>
                        </div>

                        <div class="card-content">
                            <h2 class="name">Future Perfect Continuous Tense(A.V)</h2>

                            <a   ><button class="button" name="12" type="submit">View More</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-button-next swiper-navBtn"></div>
            <div class="swiper-button-prev swiper-navBtn"></div>
            <div class="swiper-pagination"></div>
        </div>
        </form>
        
    </body>

    <!-- Swiper JS -->
    <script src="js/swiper-bundle.min.js"></script>

    <!-- JavaScript -->
    <script src="js/script.js"></script>

    <!-- Navigation JS -->
    <script src="js/nav.js"></script>
</html>